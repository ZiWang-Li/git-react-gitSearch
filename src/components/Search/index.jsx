import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
export default class Search extends Component {

    search =() => {        
        const {keyElement:{value:keyWords}} = this; //结构赋值连续写法
        //this.props.upDateAppState({isFirst:false,isLoading:true});
        PubSub.publish('gitsearch',{isFirst:false,isLoading:true});
        axios.get(`http://localhost:3000/api1/search/users?q=${keyWords}`).then(
            response =>{
                //this.props.upDateAppState({isLoading:false,users:response.data.items});
                PubSub.publish('gitsearch',{isLoading:false,users:response.data.items});
            },
            error =>{
                //this.props.upDateAppState({isLoading:false,err:error.message});
                PubSub.publish('gitsearch',{isLoading:false,err:error.message});
            }
        )
    }   //在3000给3000发请求前面的都可以省略：“api1/search/users?”
           
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
                <input ref={c => this.keyElement = c} type="text" placeholder="enter the name you search"/>&nbsp;
                
                <button onClick={this.search}>Search</button>
            </div>
            </section>
        )
    }
}
