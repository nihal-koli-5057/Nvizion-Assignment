import React,{ useState, useEffect } from 'react';
import { useDispatch , useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewEmployeeStart, updateEmployeeStart, loadUsersStart } from "../../redux/Actions/actions";
import {  loadRoleStart } from "../../redux/Actions/roleAction";
// import { loadDepartmentStart } from '../../redux/Actions/departmentActions';
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";
import { Dropdown } from 'primereact/dropdown';
import { Password } from 'primereact/password';

let emptyData = {
    name: "",
    userName: "",
    email: "",
    phone: "",
    password: '',
    roleId :""
};

const AddUser = () => {
    const [employee, setEmployee] = useState(emptyData);
    var {id, name, userName, email, phone,roleId } = employee;
    
    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();

    const users = useSelector((state) => state?.data.users);
    const roles = useSelector((state) => state?.role.role);
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateName = (name,userName) => {
        const reg = /^(([a-zA-Z]{1,50}))$/;
        return reg.test(String(name, userName));
    }

    const validatePhone = (phone) => {
        const phoneRe = /^(([0-9]{10}))$/;
        return phoneRe.test(String(phone));
    }

    const validatePassword = (password , confirmPassword) => {
        const stengthreg = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{4,16}$/;
        return stengthreg.test(String(password, confirmPassword));
    }

    useEffect(() => {
        dispatch(loadUsersStart());
    }, []); 
   
    useEffect(() => {
        dispatch(loadRoleStart());
    }, []);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleEmployee = users ? users.find((item) => item.id === Number(id)) : null;
            setEmployee({...singleEmployee});
        } else {
            setEditMode(false);
            setEmployee({...employee});
        }
    }, [id]);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Employee" : `Update Employee`}</div>
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        )
    }
    
    const addNewEmployee = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!editMode) {
            setEmployee(employee);
            if (validateName(employee.name) && validateName(employee.userName) && validateEmail(employee.email) && validatePhone(employee.phone) && validatePassword(employee.password) && employee.roleId) {
                dispatch(addNewEmployeeStart(employee));
                setTimeout(() => {
                    history.push('/admindashboard/employees')
                }, 2000)
            }   
        } else {
            if (validateName(employee.name) && validateName(employee.userName) && validateEmail(employee.email) && validatePhone(employee.phone) && employee.roleId ) {
                dispatch(updateEmployeeStart(employee));  
                setTimeout(() => {
                    history.push('/admindashboard/employees')
                }, 2000)
            }
        }
    };

    const gotoPrevious = () => {
        history.goBack();
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setEmployee({ ...employee, [name]: val });
    };

  return (
    <div className="surface-section card" style={{ margin:'1%', padding:'1%' }}>
         <Toolbar className="mb-4" left={leftToolbarTemplate}  right={rightToolbarTemplate}></Toolbar>
         <div className="col-12 md:col-6">
            <div className="card p-fluid">
                    <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" value={employee.name} onChange={(e) => onInputChange(e, "name")} className={classNames({ "p-invalid": submitted && !employee.name && !validateName(employee.name) })} required autoFocus />
                            {submitted && !employee.name && <small className="p-error">First Name is required.</small> || submitted && !validateName(employee.name) && <small className="p-error">Please Enter Valid Name!</small>}
                    </div>
                    <div className="field">
                            <label htmlFor="name">User Name</label>
                            <InputText id="userName" value={employee.userName} onChange={(e) => onInputChange(e, "userName")} className={classNames({ "p-invalid": submitted && !employee.userName && !validateName(employee.userName) })} required />
                            {submitted && !employee.userName && <small className="p-error">Last Name is required.</small> || submitted && !validateName(employee.userName) && <small className="p-error">Please Enter Valid Name!</small> }
                    </div>    
                    <div className="field">
                            <label htmlFor="name">Email Address</label>
                            <InputText id="email" value={employee.email} onChange={(e) => onInputChange(e, "email")} className={classNames({ "p-invalid": submitted && !employee.email && !validateEmail(employee.email)})} required  />
                            {submitted && !employee.email && <small className="p-error">Please! provide Email-address</small> || submitted && !validateEmail(employee.email) && <small className="p-error">Please Enter Valid Email!</small>}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Phone Number</label>
                            <InputText id="phone" value={employee.phone} onChange={(e) => onInputChange(e, "phone")} className={classNames({ "p-invalid": submitted && !employee.phone && !validatePhone(employee.phone) })} required  />
                            {submitted && !employee.phone && <small className="p-error">Required Contact Number</small> || submitted && !validatePhone(employee.phone) && <small className="p-error">Enter Valid Contact Number</small>}
                        </div>
                        <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="name">Category Belongs to</label>
                            <Dropdown  
                             className={classNames({ "p-invalid": submitted && !employee.roleId })} 
                                value={roleId} id="roleId"  
                                onChange={(e) => onInputChange(e, "roleId")} required 
                                options={roles}
                                optionValue="name"
                                placeholder="Choose a Category"
                                optionLabel="name">
                            </Dropdown>
                            {submitted && !employee.roleId && <small className="p-error">Select role </small>}
                        </div>
                    </div>
                    </div>
                    <div style={editMode ? {display : "none"} : null} className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name">Password</label>
                                <Password  id="password" value={employee.password} onChange={(e) => onInputChange(e, "password")} className={classNames({ "p-invalid": submitted && !employee.password && !validatePassword(employee.password) })} toggleMask 
                                feedback={false} required />
                                {submitted && !employee.password && <small className="p-error">Password is Required!</small> || submitted && !validatePassword(employee.password) && <small className="p-error">Must contains upper case, lower case, digit, special character</small> }
                            </div>
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times"  className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious}/>
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} icon="pi pi-check"  className="p-button-warning mr-2 mb-2" onClick={addNewEmployee} />
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AddUser;
