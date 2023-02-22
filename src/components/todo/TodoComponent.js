import { ErrorMessage, Field, Form, Formik } from "formik"
import moment from "moment/moment"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoByIdApi, updateTodoApi } from "./api/TodosApiService"
import { useAuth } from "./Security/AuthContext"

function TodoComponent() {

    const { id } = useParams()

    const navigate = useNavigate()

    const authContext = useAuth()
    const username = authContext.username

    const [description, setDescription] = useState("")
    const [targetDate, setTargetDate] = useState("")


    useEffect(() => getTodo(), [id])

    function getTodo() {
        if (id != -1) {
            retrieveTodoByIdApi(username, id)
                .then((response) => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch((error) => console.log(error))
        }
    }

    function onSubmit(values) {
        //Creating new object with updated values and pass to the updatApi for update the details.
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id == -1) {
            createTodoApi(username, todo)
                .then((response) => {
                    navigate('/todos')
                })
                .catch((error) => console.log(error))
        }
        else {
            updateTodoApi(username, id, todo)
                .then((response) => {
                    navigate('/todos')
                })
                .catch((error) => console.log(error))
        }
    }

    function validate(values) {
        let errors = {}
        if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 characters.'
        }
        if (values.targetDate == null || values.targetDate == "" || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter valid target Date'
        }
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <Formik initialValues={{ description, targetDate }} enableReinitialize={true} onSubmit={onSubmit} validate={validate} validateOnChange={false} validateOnBlur={false}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className='form-control' type='text' name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className='form-control' type='date' name="targetDate" />
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default TodoComponent