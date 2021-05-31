import React, { Component } from 'react'
import PubSub from 'pubsub-js'

export default class List extends Component {

    state = {
        users:[],
        isFirst:true,
        isLoading:false,
        err:'',
    };

    componentDidMount() {
        this.token = PubSub.subscribe('gitsearch',(_,stateObj)=>{
            this.setState(stateObj);
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }
    
    render() {

        const {users,isFirst,isLoading,err} =this.state

        return (
            <div className="row">
                {
                    isFirst ? <h2>Welcom Enter Keywords and click Search</h2> :
                    isLoading ? <h2>Loading......</h2> :
                    err ? <h2 style={{color:'red'}}>{err}</h2> :
                    users.map((useObj)=>{
                        return(
                            <div key={useObj.id} className="card">
                                <a rel="noreferrer" href={useObj.html_url} target="_blank">
                                    <img alt="avatar" src={useObj.avatar_url} style={{width: '100px'}}/>
                                </a>
                                <p className="card-text">{useObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
} 
