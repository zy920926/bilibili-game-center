import React,{ Component } from "react"
import { Link } from "react-router-dom"
import { HorizontalScroll } from "../../../commonJsx"
import { rightIcon } from "../../../icons"
import axios from 'axios';


import "./style.less"

//前端单条数据要求
/*{
    img:"/gamecover/1.jpg",
    game:"公主连接Re:Dive",
    gameId:"001",
    bookNum:"123123"
}*/
const GameItem = (props)=>{
    var data = props.data
    return(
        <li>
            <Link to={`/game/${data.gameId}`}>
                <img src={data.img} alt=""/>
            </Link>
            <div className="info">
                <div className="game-name">{data.game}</div>
                <div className="book-num">{`${data.bookNum}人已经预约`}</div>
            </div>
            <div className="b-btn">预约</div>            
        </li>
    )
}

class BookGame extends Component {
    constructor(){
        super();
        var cacheData = window.appDataCache.home.bookGame;
        this.state = {
            data:cacheData?cacheData:[]
        }
        this.getData = this.getData.bind(this)
    }

    getData(){
        var that =this;
        var CancelToken = axios.CancelToken;
        axios.get('/api/bookgame', {
            cancelToken: new CancelToken(function executor(c) {
                // executor 函数接收一个 cancel 函数作为参数
                that.requestCancel = c;
            })
        })
        .then((res)=>{
            that.setState({data:res.data.bookGame})
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    componentDidMount(){
        if(this.state.data.length!==0){//不是第一次挂载
            return;
        }
        this.getData();//第一次挂载，请求数据
    }

    componentWillUnmount(){
        if(this.requestCancel){
            this.requestCancel("<BookGame/>,组件卸载拦截请求数据");
        }
        window.appDataCache.home.bookGame = this.state.data;
    }

    render(){
        var data = this.state.data;
        return(
            <div className="book-game">
                <div className="book-game-title">
                    <span>预约中心</span>
                    <Link to="/rank"><img src={rightIcon} alt=""/></Link>
                </div>
                <div className="book-game-list">
                    <HorizontalScroll>
                        {data.map(v=>(
                            <GameItem key={v.gameId} data={v}/>
                        ))}
                    </HorizontalScroll>
                </div>
            </div>
        )
    }
}

export default BookGame;