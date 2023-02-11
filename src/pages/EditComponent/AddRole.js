import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addNewRoleStart, updateRoleStart, loadRoleStart } from "../../redux/Actions/roleAction";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import classNames from "classnames";

let emptyData = {
    name: "",
};

const AddRole = () => {
    const [role, setRole] = useState(emptyData);
    var { id, name } = role;

    const dispatch = useDispatch();
    const history = useHistory();
    var { id } = useParams();

    const users = useSelector((state) => state?.role.role);
    const [submitted, setSubmitted] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const validateName = (name, userName) => {
        const reg = /^(([a-zA-Z]{1,50}))$/;
        return reg.test(String(name, userName));
    };
    useEffect(() => {
        dispatch(loadRoleStart());
    }, []);

    useEffect(() => {
        if (id) {
            setEditMode(true);
            const singleEmployee = users ? users.find((item) => item.id === Number(id)) : null;
            setRole({ ...singleEmployee });
        } else {
            setEditMode(false);
            setRole({ ...role });
        }
    }, [id]);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3"> {!editMode ? "Add New Role" : `Update Role`}</div>
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        );
    };

    const addNewRole = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!editMode) {
            setRole(role);
            if (validateName(role.name)) {
                dispatch(addNewRoleStart(role));
                setTimeout(() => {
                    history.push("/admindashboard/roles");
                }, 2000);
            }
        } else {
            if (validateName(role.name)) {
                dispatch(updateRoleStart(role));
                setTimeout(() => {
                    history.push("/admindashboard/roles");
                }, 2000);
            }
        }
    };

    const gotoPrevious = () => {
        history.goBack();
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        setRole({ ...role, [name]: val });
    };

    return (
        <div className="surface-section card" style={{ margin: "1%", padding: "1%" }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={role.name} onChange={(e) => onInputChange(e, "name")} className={classNames({ "p-invalid": submitted && !role.name && !validateName(role.name) })} required autoFocus />
                        {(submitted && !role.name && <small className="p-error"> Name is required.</small>) || (submitted && !validateName(role.name) && <small className="p-error">Please Enter Valid Name!</small>)}
                    </div>
                    <div className="formgrid grid">
                        <div className="field col">
                            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary mr-2 mb-2" onClick={gotoPrevious} />
                        </div>
                        <div className="field col">
                            <Button label={!editMode ? "Add" : "UPDATE"} icon="pi pi-check" className="p-button-warning mr-2 mb-2" onClick={addNewRole} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRole;
