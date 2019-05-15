import React, {Component} from 'react';
import {Consumer} from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component{
    
    state = {
        showContactInfo: false
    }
    
    onShowClick = (e)=>{
        this.setState({
            showContactInfo: !this.state.showContactInfo
        });
    }
    
    onClickDelete = async (id, dispatch)=>{
        try {
            axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
            dispatch({type: 'DELETE_CONTACT', payload: id});
        } catch(e){
            dispatch({type: 'DELETE_CONTACT', payload: id});
        }
    }
    
    render(){
        const {id, name, email, phone} = this.props.contact;
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value
                    return(
                       <div className="card card-body mb-3">
                            <h4>
                                {name}
                                <i style={{cursor:'pointer'}} className="fas fa-sort-down" onClick={this.onShowClick}/>
                                <button style={{float:'right'}} className="btn btn-outline-danger btn-sm" onClick={this.onClickDelete.bind(this, id, dispatch)}>
                                    <i className="fas fa-times"></i>
                                </button>
                                <Link to={`contact/edit/${id}`}>
                                    <i 
                                        className="fas fa-pencil-alt"
                                        style={{
                                            cursor: 'pointer',
                                            float: 'right',
                                            color: 'black',
                                            marginRight: '1rem'
                                        }}
                                    />
                                </Link>
                            </h4>
                            {this.state.showContactInfo ?
                                (<ul className="list-group">
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Phone: {phone}</li>
                                </ul>) : null
                            }
                            
                        </div> 
                    );
                }}
            </Consumer>    
        );
    }    
}

export default Contact;
