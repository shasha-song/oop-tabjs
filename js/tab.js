var that;
class Tab {
    constructor(id) {//接收new出来的实例对象传过来的参数
        //获取元素
        that = this;
        this.main = document.querySelector(id);

        this.add = this.main.querySelector('.tabadd');
        
        //li的父元素获取
        this.ul = this.main.querySelector('.firstnav ul:first-child');
        //获取section的父元素
        this.fsection = this.main.querySelector('#con');
        this.init();//写在这里可以创建实例的时候就调用
    }
    init() {
        this.updateNode();
        //初始化操作，让相关的元素绑定事件
        this.add.onclick = this.addTab;
        for(var i = 0; i < this.lis.length; i++) {
            // 保存下标为index属性
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;//父一级有索引
            this.spans[i].ondblclick = this.editTab;
            // this.sections[i].ondblclick = this.editTab;
            this.sectionSpans[i].ondblclick = this.editTab;
        }
    }
    //动态添加元素，需要重新获取相对应的元素
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.sectionSpans = this.main.querySelectorAll('section span');
        //拿到删除按钮 所有
        this.remove = this.main.querySelectorAll('.delect');
        this.spans = this.main.querySelectorAll('.firstnav li span:first-child')
    }
    //1.切换功能
    toggleTab() {
        //console.log(this.index);
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    } 
    //清除所有li和section的class
    clearClass() {
        for(var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            that.sections[i].className = '';
        }
    }
    //2.添加功能
    addTab() {
        that.clearClass();
        //(1)创建li元素和section元素
        var random = Math.random();
        var li = '<li class="liactive"> <span>新选项卡</span> <span class="delect">X</span></li>';
        var section = '<section class="conactive"> <span class="content">内容'  + random + '</span></section>'
        //(2)把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend',li);
        that.fsection.insertAdjacentHTML('beforeend',section);
        that.init();
    }
    //3.删除功能
    removeTab(e) {
        e.stopPropagation(); //e阻止冒泡,防止触发li标签的切换点击事件
        var index = this.parentNode.index;
        //console.log(index);
        //根据索引号删除对应的li和section   remove()方法可以直接删除指定的元素
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        //当我们删除的不是选中状态的li的时候，选中状态保持不变
        if(document.querySelector('liactive')) return;
        //当删除选中状态的li的时候，让前一个li元素处于选中状态
        index--;
        //手动调用li点击事件，不需要鼠标触发  前面如果为真&& 执行后面，为假不再执行
        that.lis[index] && that.lis[index].click();
    }
    //4.修改功能
    editTab(e) {
        // this指向section span & li span
        var str = this.innerHTML;//this指向span，因为span双击事件调用此函数
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];//获取到span第一个子元素input
        input.value = str;
        input.select();//让文本框里面的文字处于选中状态
        //当我们离开文本框，就把文本框里面的值给span
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        //按下回车也可以把文本框里面的值给span
        input.onkeyup = function(e){
            if(e.keyCode === 13) {
                //手动调用表单失去焦点事件 不需要鼠标离开操作
                this.blur();
            }
        }

    } 
}

 new Tab('#tab');
