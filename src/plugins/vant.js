import Vue from "vue"

//底部导航
import { Tabbar, TabbarItem} from 'vant';
Vue.use(Tabbar).use(TabbarItem);

//加载中
import { Loading } from 'vant';
Vue.use(Loading);

//图片懒加载
import { Image } from 'vant';
Vue.use(Image);


//轻提示
import { Toast } from 'vant';
Vue.use(Toast);

//导航栏
import { NavBar } from 'vant';
Vue.use(NavBar);

//Cell 单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
// Button 按钮
import { Button } from 'vant';
Vue.use(Button);

// Field 输入框
import { Field } from 'vant';
Vue.use(Field);

import { Icon } from 'vant';
Vue.use(Icon);