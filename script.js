class Task{
    constructor(id=0,text='no text',state=false,date=new Date(),delClass,changClass){
        this.id=id;
        this.text=text;
        this.state=state;
        this.date=date;
        this.htmlLi='';
        this.delClass=delClass;
        this.changClass=changClass;
    }
    get taskData(){
        return {text:this.text,state:this.state,date:this.date};
    }
    get taskState(){
        return this.state;
    }
    setState(b){
        this.state=b;
        this.htmlLi=this.getHtmlLi();

    }
    setText(t){
        this.text=t;
        this.htmlLi=this.getHtmlLi();

    }
    setId(id){
        this.id=id;
        this.htmlLi=this.getHtmlLi();

    }
    delete(){
        this.delete;
    }
    changeState(){
        this.state=!this.state;
        this.htmlLi=this.getHtmlLi();
    }
    getHtmlLi(){
        let c,ic;
        if(!this.state){
            c='grayState';
            ic=`fa-spinner`;
        }else {
            c='greenState';
            ic=`fa-check`;
        }
        return `<li class="item" title='${this.date.toLocaleDateString()} - ${this.date.toLocaleTimeString()}'><div class='chang ${c} ${this.changClass}' data-task='${this.id}'><i class="fas ${ic}"></i></div><p>${this.text}</p><a class='${this.delClass}' href="#" data-task='${this.id}'><i class="far fa-trash-alt"></i></a></li>
        `;
    }
}
class Tasks{
    constructor(tasksArray=[],unDoneUlId,doneUlId,delBtnClass,changeStateBtnClass,inputTextId,borderId){
    this.borderId=borderId;
    this.tasksArray= tasksArray;
    this.num=tasksArray.length;
    this.unDoneUlId=unDoneUlId;
    this.doneUlId=doneUlId;
    this.delBtnClass=delBtnClass;
    this.changeStateBtnClass=changeStateBtnClass;
    this.inputTextId=inputTextId;
    this.addInputTextListener=function(){
        const t=this;
     
        $('#'+t.inputTextId).on('keyup',function(e){
            if (e.keyCode === 13) {
                const text=$(this).val();
                $(this).val('');
                t.addTask(new Task('',text,false,new Date(),t.delBtnClass,t.changeStateBtnClass));
            }
        });
       
    }
    this.addInputTextListener();
}
    init(){
        $('#'+this.unDoneUlId).html(this.getUnDoneUlHtml());
        $('#'+this.doneUlId).html(this.getDoneUlHtml());
        this.resetEventsListner();
    }
    
    addTask(t){
        this.num++;
        t.setId('task'+this.num);
        this.tasksArray.push(t);
        this.init();
    }

    removeTask(id){
        if(confirm('are you sure?')){
            let index;
            this.tasksArray.forEach(function(t,i){
                if(t.id==id){
                    index=i;
                    t.delete();
                }
            });
            this.tasksArray.splice(index, 1);
            this.init();
        }
    }
    getUnDoneUlHtml(){
        const th=this;
        return this.tasksArray.map(function(t){
            if(!t.state){
                return t.getHtmlLi();
            }
        }).join('');
    }
    getDoneUlHtml(){
        const th=this;
        return this.tasksArray.map(function(t){
            if(t.state){
                return t.getHtmlLi();
            }
        }).join('');
    }
    resetEventsListner(){
        let t=this;

        $('.'+t.delBtnClass).click(function(e){
            e.preventDefault();
            const id=$(this).data('task');
            t.removeTask(id);
        });

        $('.'+t.changeStateBtnClass).click(function(){
            const id=$(this).data('task');
            t.tasksArray.map(function(t){
                if(t.id==id){
                    t.changeState();
                }
            });
            t.init();
        });


    }
}
class Board{
    constructor(borderId,inputId,doneUlId,undoneUlId,delClass,changClass){
        this.borderId=borderId;
        this.inputId=inputId;
        this.doneUlId=doneUlId;
        this.undoneUlId=undoneUlId;
        this.delClass=delClass;
        this.changClass=changClass;
        this.htmlCode=`<div id='${borderId}'>
                            
                            <div>
                                <input type="text" name="" class='inputTask' id="${this.inputId}" placeholder="Enter Your Task">
                            </div>
                            <ul id='${this.undoneUlId}' class='tasksList'></ul>
                            <ul id='${this.doneUlId}' class='doneTasksList'></ul>
                        </div>`;
    }
    addBoard(id){
        $('#'+id).append(this.htmlCode);
    }
    getAllHtmlElement(){
        return [this.undoneUlId,this.doneUlId,this.delClass,this.changClass,this.inputId,this.borderId];
    }

}
$(function(){
    let n=0;
    $('body').on('dblclick',function(e){
        n++;
        if(e.target==this) console.log(addBoard(n,'container'));
    });
    function addBoard(n,g){
        const a='border'+n,
        b='inputTask'+n,
        c='doneTasksList'+n,
        d='tasksList'+n,
        o='d'+n,
        f='c'+n;
        let border=new Board(a,b,c,d,o,f); 
        border.addBoard(g);
        const e=border.getAllHtmlElement();
        let myTasks=new Tasks([],e[0],e[1],e[2],e[3],e[4],e[5]);
        myTasks.init();
        return {border,myTasks};
    }



});