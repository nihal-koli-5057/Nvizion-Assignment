import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getSingleRoleStart } from "../../redux/Actions/roleAction";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar"


const Role = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const singleRoleData = useSelector((state) => state.role.singleRole);
    let arr = []
    const assignmentsData = useSelector((state) => state.employeeDetails.singleUserAssignment);
    assignmentsData?.map((data) => {
        const item =  data.itemDetail
        arr.push(item)
    });

    useEffect(() => {
        dispatch(getSingleRoleStart(id));
    }, []);

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Back" icon="pi pi-angle-left" className="p-button-secondary mr-2" onClick={gotoPrevious} />
                </div>
            </React.Fragment>
        )
    }
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <div className="font-medium text-4xl text-900 mb-3">{`Role Information`}</div>
                </div>
            </React.Fragment>
        )
    }
    const gotoPrevious = () => {
        history.goBack();
    }

    return (
        <div className="surface-section card" style={{ margin: '1%', padding: '1%' }}>
            <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
            <ul className="list-none p-0 m-0">
                <li className="flex align-items-center py-5 px-8 border-top-1 surface-border flex-wrap">
                    <div className="text-500 text-2xl w-6 md:w-3 font-medium">Name</div>
                    <div className="text-900 text-2xl w-full md:w-8 md:flex-order-0 flex-order-1">{singleRoleData?.name}</div>
                </li>
            </ul>
        </div>
    )
}

export default Role;
