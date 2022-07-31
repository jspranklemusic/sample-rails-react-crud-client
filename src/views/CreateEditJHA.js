import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background: var(--color-white);
    border-radius: 10px;
    padding: 1rem;
    margin: 2rem auto;
    width: calc(100% - 4rem);
`;

const FormField = styled.div`

`

const Label = styled.label`

`

const Input = styled.input`

`


const CreateJHA = props => {

    const putJHA = async () => {
        
    }

    const postJHA = async () => {
        
    }

    const actionText = props.new ? 'Create' : 'Edit';
    return(
        <Wrapper>
            <h1>{actionText} Job Hazard Analysis</h1>
            <p></p>
            <form>
                <FormField>
                    <h3>Title</h3>
                    <p>What is the title of this Job Hazard Analysis?</p>
                    <Label for="title">Title</Label>
                    <input name="title" id="title"/>
                </FormField>
                <FormField>
                <h3>Jobs</h3>
                <p>Select from Dropdown or add a new job:</p>
                    <Label for="job">Job</Label>
                    <select>
                        <option>Accountant</option>
                        <option>Trucker</option>
                        <option>Cashier</option>
                    </select>
                    <Input name="job" id="job"/>
                    <button>Add Job</button>
                </FormField>
                
                <FormField>
                    <h3>Tasks</h3>
                    <p>What are some of the tasks for this job?</p>
                    <Label for="task">Task</Label>
                    <input name="task" id="task"/>
                </FormField>
                <FormField>
                    <h3>Hazards</h3>
                    <p>What are some of the hazards associated with these tasks?</p>
                    <Label for="hazard">Hazard</Label>
                    <input name="hazard" id="hazard"/>
                </FormField>
                <FormField>
                    <h3>Safeguards</h3>
                    <p>How can safeguards be implemented to mitigate the risk of these hazards?</p>
                    <Label for="safeguard">Safeguard</Label>
                    <input name="safeguard" id="safeguard"/>
                </FormField>

                <br></br>
                <button>{actionText} Analysis</button>
            </form>
        </Wrapper>
    )
}

export default CreateJHA;