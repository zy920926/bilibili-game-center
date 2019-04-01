import * as React from "react";
import {loadingIcon} from "src/components/icons"
import "./list-auto-loading.css";
import BlueBtn from '../blue-btn';

const Loading =()=>{
    return(
        <div className="common-list-auto-loading">
            <div className="loading-icon">
                <img src={loadingIcon} alt=""/>
            </div>
        </div>
    )
}

const Failed =(props:{retry:()=>void})=>{
    return(
        <div className="common-list-auto-loading">
            <div className="failed">
                服务器离家出走中("▔□▔)/
            </div>
            <div className="retry-btn" onClick={props.retry}>
                <BlueBtn width="4rem" height="2rem" link="#" name="重试"/>
            </div>
        </div>
    )
}

const NoMore = ()=>(
    <div className="common-list-auto-loading">
        <div className="nomore">(〜￣△￣)〜没有更多了</div>
    </div>
)

enum loadingState {
    loading,
    failed,
    nomore,
}

/**
 * @param props 
 */
class ListAutoLoading extends React.Component {
    public props:{now:loadingState, failedRetry:()=>void}
    public render(){
        switch (this.props.now){
        case loadingState.loading:
            return <Loading/>
        case loadingState.failed:
            return <Failed retry={this.props.failedRetry}/>
        case loadingState.nomore:
            return <NoMore/>
        }
    }
}

export {
    ListAutoLoading,
    loadingState
};