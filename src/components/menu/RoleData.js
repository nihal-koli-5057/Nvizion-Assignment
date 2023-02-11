import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadRoleStart, deleteRoleStart } from "../../redux/Actions/roleAction";
import { Link } from "react-router-dom";

const RoleData = () => {
    let RoleData = [];
    const dispatch = useDispatch();
    const history = useHistory();
    const dt = useRef(null);
    const roles = useSelector((state) => state.role.role);
    const [role, setRole] = useState();
    const [deleteRoleDialog, setDeleteRoleDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        dispatch(loadRoleStart());
    }, []);

    const gotoPrevious = () => {
        history.goBack();
    };

    const hideDeleteRoleDialog = () => {
        setDeleteRoleDialog(false);
    };

    const confirmDeleteRole = (role) => {
        setRole(role);
        setDeleteRoleDialog(true);
    };

    const deleteRole = async () => {
        setRole(role);
        dispatch(deleteRoleStart(role));
        setDeleteRoleDialog(false);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Link to={`/addnew-role/`}>
                        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                    </Link>
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
    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Link to={`/update-role/${rowData.id}`}>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mt-2 mr-2" />
                </Link>
                <Link to={`/role/${rowData.id}`}>
                    <Button icon="pi pi-info-circle" className="p-button-rounded p-button-info mt-2 mr-2" />
                </Link>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2 mr-2" onClick={() => confirmDeleteRole(rowData)} />
            </div>
        );
    };
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">List Of Roles</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteRoleDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRoleDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteRole} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card" style={{ margin: "1%" }}>
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    {roles?.map((userList) => {
                        RoleData.push(userList);
                    })}
                    <DataTable
                        ref={dt}
                        value={RoleData}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Roles"
                        globalFilter={globalFilter}
                        emptyMessage="No Roles found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column style={{ display: "none" }} field="id" header="" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="id" header="Id" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column field="name" header="Name" sortable headerStyle={{ width: "14%", minWidth: "10rem" }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={deleteRoleDialog} style={{ width: "450px" }} header="Confirm" modal footer={deleteRoleDialogFooter} onHide={hideDeleteRoleDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
                            {role && (
                                <span>
                                    Are you sure you want to delete <b>{role.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(RoleData, comparisonFn);
