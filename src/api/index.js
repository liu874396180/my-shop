/**   
 * api接口统一管理
 */
import { get, post } from './server'
// 轮播图
export const swipeList = (params) => post('/mock', params);

// 活动列表
export const activeList = (params) => post('/mock', params);

// 热卖单品
export const hotSaleList = (params) => post('/mock', params);

// 导航栏
export const navList = (params) => post('/mock', params);

// 分类页面
export const cateList = (params) => post('/mock', params);

// 消息列表
export const linkList = (params) => post('/mock', params);
// 消息列表2
export const chatList = (params) => post('/mock', params);