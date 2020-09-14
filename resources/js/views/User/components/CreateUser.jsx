import React, { Fragment } from 'react';
import { Button, Col } from 'reactstrap';
import Axios from 'axios';
import Swal from 'sweetalert2';

class CreateUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            name: null,
            last_name: null,
            document: null,
            password: null,
            phones: null,
            email: null,
            phone: null,
        }

        this.openModal = this.openModal.bind(this)
        this.handlerChange = this.handlerChange.bind(this)
        this.createDataUser = this.createDataUser.bind(this)
    }

    openModal(id, data = null){
        $("#createUser").modal('show');
    }

    handlerChange(event){
        var name = event.target.name;
        var value = event.target.value;
        this.setState({ [name]: value })
        console.log(this.state.name)
    }

    closeModal(id){
        $(id).modal('hide')
    }

    createDataUser(){
        let data = {
            id: this.state.id,
            name: this.state.name,
            last_name: this.state.last_name,
            document: this.state.document,
            email: this.state.email,
            phone: this.state.phone
        }
        Axios.post('api/user/createUser', data)
        .then(res => {
            if(res.data.transaction.status == true){
                Swal.fire({
                    icon: 'success',
                    html: `Se creo exitosamente la información del usuario <b>${ this.state.name + ' ' + this.state.last_name }</b>`
                })
                this.closeModal();
                window.location.reload()
            }else{
                Swal.fire({
                    icon: 'error',
                    text: 'No se pudo guardar la nueva informacion del usuario',
                })
            }
        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                text: err
            })
        })
    }

    render(){
        return(
            <Fragment>
                <Col>
                    <Button outline color="success" onClick={ this.openModal }>
                        <i className="fa fa-plus"></i> Crear Usuario
                    </Button>
                </Col>
                <div className="modal" id="createUser" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Crear Usuario</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body row">
                                <div className="form-group col-md-6">
                                    <label>Nombres</label>
                                    <input type="text" name="name" value={ this.state.name } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellidos</label>
                                    <input type="text" name="last_name" value={ this.state.last_name } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Documento</label>
                                    <input type="number" name="document" value={ this.state.document } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Correo Electronico</label>
                                    <input type="text" name="email" value={ this.state.email } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Telefono</label>
                                    <input type="number" name="phone" value={ this.state.phone } className="form-control" onChange={ this.handlerChange }/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={ this.closeModal }>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={ this.createDataUser }>Crear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreateUser;