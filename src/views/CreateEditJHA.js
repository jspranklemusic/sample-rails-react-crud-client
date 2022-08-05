import React, { useState, useEffect } from 'react'
import { FormField, TextInput, FormSection} from '../components/Form';
import { Button, Close } from '../components/Button';
import { useSelector, useDispatch } from 'react-redux'
import { setAlertMessage } from '../reducer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HazardsAndSafeguards, Wrapper, BackText, Li } from '../components/CreateEditJHAElements';

// I know there's a lot going on here. in a refactor, I would split this into different components.
const CreateJHA = props => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [selectedTaskId, setSelectedTaskId] = useState(-1);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobInput, setJobInput] = useState("");
    const [selectedJob, setSelectedJob] = useState({title: ""});
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    // navigate unauthorized users away
    useEffect(()=>{
        if(!user){
            navigate("/")
        }else{
            fetchJobs();
        }
    },[]);

    // this must be here in case the user clicks to 'create' from 'edit' url
    useEffect(()=>{
        setTitle("");
        setJobs([]);
        setSelectedTaskId(-1);
        setSelectedJob({title: ""});
        setTasks([]);
    },[props.new])

    // fetch the relevant jha data
    const fetchJobs = async ()=> {
        // if creating, only fetch the jobs
            let jobsData = [];
            // this needs to be dynamic
            const response = await fetch("http://localhost:3000/jobs");
            if(response.ok){
                jobsData = await response.json();
                setJobs(jobsData);
                if(jobsData.length > 0){
                    setSelectedJob(jobsData[0])
                }
            }else{
                // handle error
                dispatch(setAlertMessage({
                    alertMessage: "Couldn't fetch jobs.",
                    alertTheme: "error"
                }))
            }
            setLoading(false);
        // if editing, also fetch the full information for the job hazard analysis
        if(!props.new){
            const response = await fetch('http://localhost:3000/job_hazard_analyses/'+params.id);
            if(response.ok){
                const data = await response.json();
                if(data.tasks.length > 0){
                    setTasks(data.tasks)
                    setSelectedTaskId(0);
                    setTitle(data.title);
                    const job = jobsData.filter(j => j.id == data.job_id);
                    if(job.length > 0){
                        setSelectedJob(job[0])
                    }
                }
            }else{
                dispatch(setAlertMessage({
                    alertMessage: "Couldn't fetch data.",
                    alertTheme: "error"
                }))
            }
            // show once loaded
            setLoading(false);
        }
        
    }

    // remove a task
    const removeTask = ()=> {
        const copyTasks = [...tasks];
        let index = selectedTaskId;
        copyTasks.splice(selectedTaskId,1);
        if(index > 0){
            index--;
        }else if(copyTasks.length > 0){
            index++;
        }else{
            index = -1;
        }
        setSelectedTaskId(index);
        setTasks(copyTasks);
    }

    // add a a new task
    const addTask = ()=> {
        const taskInput = document.querySelector("#task");
        if(!taskInput.value) 
            return;
        const newLength = tasks.length;
        setTasks([...tasks, {description: taskInput.value, safeguards: [], hazards: []}]);
        setSelectedTaskId(newLength);
        taskInput.value = "";
        setTimeout(()=>{
            document.querySelector("#hazard").focus();
        })
    }

    // add a hazard or a safeguard
    const addSubItem = (itemType)=> {
        const input = document.querySelector("#"+itemType);
        if(!input.value)
            return;
        const copyTasks = [...tasks]
        copyTasks[selectedTaskId][itemType+"s"].push({description: input.value});
        setTasks(copyTasks);
        input.value = "";
        // move focus to next in line
        const selector = itemType == "hazard" ? "safeguard" : "hazard";
        document.getElementById(selector).focus();
    }

    // remove a hazard or a safeguard
    const removeSubItem = (itemType, i) => {
        const copyTasks = [...tasks];
        copyTasks[selectedTaskId][itemType+"s"].splice(i,1);
        setTasks(copyTasks);
    }

    // handle the submit to create or edit the JHA
    const submitHandler = async e => {
        e.preventDefault();
        sendJHA(props.new ? "POST" : "PUT");
    }

    // when the user selects a job from the dropdown
    const selectHandler = e => {
        const job = jobs.find(job => job.title == e.target.value);
        setSelectedJob(job);
    }

    
    // make a new post request to create a JHA
    const sendJHA = async (method) => {
        var requestObject = {
            author_id: user.id,
            tasks: tasks,
            title: title,
          }
        // the endpoint either takes a job_id or a new job
          if(jobInput){
            requestObject.job = {
                title: jobInput
            };
          }else{
            requestObject.job_id = selectedJob.id;
          }
        // if error or invalid request (also validated server side)
        if(!validate(requestObject)){
            dispatch(setAlertMessage({
                alertMessage: "Please complete all fields with at least 1 task, 1 hazard, and 1 safeguard."
            }))
            return;
        }
        const id = params.id ? "/"+params.id : ""
        const response = await fetch("http://localhost:3000/job_hazard_analyses"+id, {
            headers: {
                "Content-Type":"application/json"
            },
            method: method,
            credentials: "include",
            body: JSON.stringify(requestObject)
        })
        // if the result fails
        if(!response.ok){
            const data = await response.json();
            if(typeof data == "string"){
                dispatch(setAlertMessage({
                    alertMessage: data,
                    alertTheme: "error"
                }));
            }else{
                dispatch(setAlertMessage({
                    alertMessage: data.exception ? data.exception ? data.error : data.error : "There was an error",
                    alertTheme: "error"
                }));
            }
        // if the result succeeds, go to view all
        }else{
            navigate("/view");
        }
    }

    // check if there are any safeguards and hazards
    const validateSubItems = tasks => {
        for(let i in tasks){
            if(!tasks[i].hazards.length){
                return false;
            }
            if(!tasks[i].safeguards.length){
                return false;
            }
        }
        return true;
    }

    // don't request if invalid
    const validate = (requestObject)=> {
        if(
            !requestObject.tasks.length ||
            !requestObject.title ||
            !validateSubItems(requestObject.tasks) ||
            (!requestObject.job && !requestObject.job_id) ||
            !requestObject.author_id
        ){
            return false;
        }
        return true;
    }

    const actionText = props.new ? 'Create' : 'Edit';
    const jobSelectText = jobs.length == 0 ? "What job is this for?" : "Select from Dropdown or add new job:";
    const jobPlaceholderText = !selectedJob?.title ? "Job Title" : selectedJob?.title;
    
    return(
        !loading && <Wrapper>
            {/* Display a back button if editing */}
            {!props.new && 
            <BackText>
                <Link to="/view">← Go Back</Link>
            </BackText>}
            <h2>{actionText} Job Hazard Analysis</h2>
            <form onKeyDown={e => e.key == "Enter" && e.preventDefault()} onSubmit={(e)=>submitHandler(e)}>
                <FormSection className='grid'>
                    <div>
                        {/* TITLE */}
                        <h3>
                            <label for="title">Title</label>
                        </h3>
                        <p>What's the title of this analysis?</p>
                        <TextInput 
                            required
                            onChange={e=>setTitle(e.target.value)} 
                            placeholder={title || "Title"}
                            value={title}
                            name="title" 
                            id="title"/>
                    </div>
                    <div>
                        {/* JOB */}
                    <h3>
                        <label for="job">Job</label>
                    </h3>
                    <p>{jobSelectText}</p>
                        <TextInput placeholder={jobPlaceholderText} onChange={e=>setJobInput(e.target.value)} name="job" id="job"/>
                        {jobs.length > 0 && 
                        <select style={{margin: "1rem auto"}} value={selectedJob.title} onChange={selectHandler} disabled={jobInput.length > 0 || !jobs.length}>
                            {jobs.map(job=><option id={job.id} key={job.id}>{job.title}</option>)}
                        </select >}
                    </div>

                </FormSection>
        
                <FormSection>
                    {/* TASKS */}
                    <h3>
                    <label for="task">Tasks ({tasks.length})</label>
                    </h3>
                    <p>What are some of the tasks for this job?</p>
                    <FormField>
                    <TextInput enterPress={()=>addTask()} placeholder='Task' name="task" id="task"/>
                    <Button type="button" style={{marginLeft: "1rem", flex:"25%"}} className='secondary' onClick={addTask}>Add Task</Button>
                    </FormField>
                 
                    <ul>
                        {tasks.map((task,i)=>(
                        <Li 
                            selected={tasks[selectedTaskId].description} 
                            onClick={()=>setSelectedTaskId(i)} 
                            task={task.description}
                            key={task.description+"-"+i}>
                            {task.description}
                        </Li>))}
                    </ul>
                </FormSection>
               {selectedTaskId > -1 && <FormSection>
                    <h3>{tasks[selectedTaskId]?.description}</h3>
                    <div style={{width:"max-content"}} onClick={removeTask} class="link-style">
                        Remove Task &nbsp;<Close/> 
                    </div>
                    {/* HAZARDS */}
                    <HazardsAndSafeguards>
                        <div className='left'>
                            <h3>
                                <label for="hazard">Hazards</label>
                            </h3>
                            <ul>{tasks[selectedTaskId]?.hazards && tasks[selectedTaskId].hazards.map((hazard,i)=>(
                                <li onClick={()=>removeSubItem("hazard",i)} key={hazard+"-"+i}>
                                    {/* In EDIT view, it's an object. in CREATE view, it's a string */}
                                    {hazard.description}
                                </li>))}
                            </ul>
                        </div>
                        {/* SAFEGUARDS */}
                        <div className="right">
                            <h3>
                                <label for="safeguard">Safeguards</label>
                            </h3>
                            <ul>{tasks[selectedTaskId]?.safeguards && tasks[selectedTaskId].safeguards.map((safeguard,i)=>(
                                <li onClick={()=>removeSubItem("safeguard",i)} key={safeguard+"-"+i}>
                                    {/* In EDIT view, it's an object. in CREATE view, it's a string */}
                                    {safeguard.description}
                                </li>))}
                            </ul>
                        </div>
                    </HazardsAndSafeguards>
                    <div>
                        <p>What are some of the hazards associated with this task?</p>
                        <FormField>
                            <TextInput 
                                enterPress={()=>addSubItem("hazard")} 
                                placeholder='Hazard' 
                                name="hazard" 
                                id="hazard"/>
                            <Button  
                                onClick={()=>addSubItem("hazard")} 
                                style={{flex:"25%",marginLeft:"1rem"}}
                                type="button"
                                className='secondary'>
                                Add Hazard
                            </Button>
                        </FormField>
                 
                    </div>
                    <div>
                        <p>How can safeguards be implemented to mitigate the risk of these hazards?</p>
                        <FormField>
                            <TextInput 
                                enterPress={()=>addSubItem("safeguard")} 
                                placeholder='Safeguard' 
                                name="safeguard" 
                                id="safeguard"/>
                            <Button 
                                onClick={()=>addSubItem("safeguard")} 
                                style={{flex:"25%",marginLeft:"1rem"}}
                                type="button"
                                className='secondary'>
                                Add Safeguard
                            </Button>
                        </FormField>
                    </div>
                </FormSection>}

                <br></br>
                <Button type="submit">{actionText} Analysis</Button>
            </form>
        </Wrapper>
    )
}

export default CreateJHA;