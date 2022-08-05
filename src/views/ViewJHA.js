import React, { useState, useEffect } from "react";
import ItemJHA from "./ItemJHA";
import styled from "styled-components";
import { TextInput } from "../components/Form";

const Wrapper = styled.div`
    background: var(--color-white);
    border-radius: 10px;
    padding: 1rem;
    margin: 2rem auto;
    width: 100%;
    animation: fadein 0.5s backwards;
    max-width: 650px;
    li {
        max-width: 100%;
        word-break: break-word;
        margin: 1rem 0;
    }
    ul.parent {
        padding: 0;
    }
    h2 {
        text-align: center;
    }
`
const Filters = styled.div`
    display: flex;
    align-items: center;
    .filter {
        select {
            margin: 0 .5rem;
        }
        margin: 0 0.5rem;
        align-items: center;

    }
`
const ViewJHA = ()=> {
    const [JHA, setJHA] = useState([]);
    const [expandedId, setExpandedId] = useState("");
    const [searchText, setSearchText] = useState("");
    const [sortByDate, setSortByDate] = useState("No Filter");
    const [resultCount, setResultCount] = useState(0);

    useEffect(()=>{
        fetchJobHazardAnalyses();
    },[])


    const fetchJobHazardAnalyses = async ()=> {
        const response = await fetch("http://localhost:3000/job_hazard_analyses");
        const data = await response.json();
        setJHA(data.reverse());
    }
    const filterFunc = jha => {
        if(!searchText){
            return true;
        }
        const text = JSON.stringify(jha).toLowerCase();
        return text.match(searchText);
    }
    const sortByDateFunc = (a,b) => {
       if(sortByDate == "Ascending"){
        return new Date(a.created_at).getTime() > new Date(b.created_at).getTime()
       }else{
        return new Date(a.created_at).getTime() < new Date(b.created_at).getTime()
       }
    }
    const filterAndSort = (jhas) => {
        let new_jhas = []
        new_jhas = jhas.filter(jha => filterFunc(jha));
        if(sortByDate != "No Filter"){
            new_jhas = new_jhas.sort((a,b)=>sortByDateFunc(a,b));
        }
        return new_jhas
    }
    return(
        <Wrapper>
            <h2>View Job Hazard Analyses</h2>
            <p>Find a particular Job Hazard Analysis here.</p>
            <Filters>
                <div className="filter">
                    <TextInput onChange={e => setSearchText(e.target.value.toLowerCase())} placeholder="Search..."/>
                </div>
                <div className="filter">
                <span>Date</span>
                    <select onChange={e => setSortByDate(e.target.value)}>
                        <option>No Filter</option>
                        <option>Ascending</option>
                        <option>Descending</option>
                    </select>
                </div>
            </Filters>
       
            <ul className="parent">
                {filterAndSort(JHA).map(jha => (
                <ItemJHA 
                    setExpanded={()=>jha.id == expandedId ? setExpandedId("") : setExpandedId(jha.id)} 
                    expanded={jha.id == expandedId} 
                    key={jha.id}
                    shiftItem={()=>setJHA([...JHA.filter(item => item.id != jha.id)])}
                    jha={jha}/>))}
            </ul>
        </Wrapper>
    )
}

export default ViewJHA