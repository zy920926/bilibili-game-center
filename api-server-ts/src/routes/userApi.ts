import * as Koa from "koa";
import * as fs from "fs";
import { parsePostData } from "../utilities";
import { createUserToken } from "../token/userToken";
import { DB } from "../db"

// config
const { cookieMaxAge } = JSON.parse(fs.readFileSync("appConfig.json").toString());;

type CtxType = Koa.ParameterizedContext;
// routes
const apiRoutes:{
    path:string, 
    method:string,
    handleFunc:(ctx:CtxType) => void
}[] = [];

/*  
status
登录登出：100x
用户操作、认证有关：101x
*/

// add route 
// 输入密码登录
apiRoutes.push({
    method:"POST",
    path:"/login",
    handleFunc:async (ctx:CtxType)=>{
        // ctx.cookies.set();
        let postBody = await parsePostData(ctx,"json");
        let db = new DB();
        let userData = await db.useTable("users").select("uid","pwd").where("uid",postBody.uid).result();
        if(userData.length === 0){
            ctx.body = {status: 1002};// 无用户
            return;            
        }
        if (postBody.pwd === userData[0].pwd) {
            // 生成token
            const token = createUserToken(postBody.uid); 
            // 设置cookie
            ctx.cookies.set("uid",postBody.uid, {maxAge: cookieMaxAge*24*60*60*1000});

            // 是否保存登录状态
            if (postBody.rememberme === true) {
                // 保存cookie
                ctx.cookies.set("userToken", token , {maxAge: cookieMaxAge*24*60*60*1000});
            } else {
                // 会话cookie
                ctx.cookies.set("userToken", token );
            }
            // res
            ctx.body = {status: 1001};// 登录成功
        } else {
            ctx.body = {status: 1002};// 密码错误
        }
    }
});

// 登出，会清除客户端token
apiRoutes.push({
    method:"GET",
    path:"/logout",
    handleFunc:async (ctx:CtxType)=>{
        // 已经被前面中间件验证
        ctx.cookies.set('userToken','',{maxAge:0})
        ctx.body = {status:1001};
    }
});

apiRoutes.push({
    method:"GET",
    path:"/login",
    handleFunc:async (ctx:CtxType)=>{
        // 已经被前面中间件验证
        ctx.body = {status:1011};
    }
});

// user information
apiRoutes.push({
    method:"GET",
    path:"/user/info",
    handleFunc:async (ctx:CtxType)=>{
        // 已经被前面中间件验证
        let uid = ctx.cookies.get("uid");
        let db = new DB();
        let userRows = await db.useTable("users").select(
            "follower","following","goodNum","headPicSrc","lv","sex","uid","userName","coverSrc"
        ).where("uid",uid).result();
        ctx.body = {info:userRows[0]};
    }
});

// user`s menu information
apiRoutes.push({
    method:"GET",
    path:"/user/menu",
    handleFunc:async (ctx:CtxType)=>{
        // 已经被前面中间件验证
        let uid = ctx.cookies.get("uid");
        let db = new DB();
        let userRows = await db.useTable("users").select(
            "bigGift","bookedGame","boughtGame","myCollect","myEvaluate","myGift","playedGame","updateNum"
        ).where("uid",uid).result();
        ctx.body = {menuInfo:userRows[0]};
    }
});

export default function () {
    return async function ( ctx: CtxType, next:()=>Promise<any>) {
        for(const route of apiRoutes){
            if(route.path === ctx.path && route.method === ctx.method) {
                await route.handleFunc(ctx);
                return;
            }
        }
        // 未匹配到路由，继续
        await next();
    }
}