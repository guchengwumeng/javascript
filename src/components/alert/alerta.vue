<template>
  <div class="alertModal" ref="alert">
    <!--social post弹框-->
      <transition name="fade">
          <div v-if="modelFlag==1" class="alertbox">
            <div class="alert-dialog">            
                <div class="alert-header">
                    <span  class="alertclose" v-if="Flag==1" @click="close">关闭</span>
                    <span class="alert-title">
                       {{modelTitle}}
                    </span>
                </div>
                <div class="alert-body" v-html="modelContent">              
                </div>
                <div class="alert-footer">
                    <button class="alertbtn" v-if="Flag==1" @click="close">{{modelClose}}</button>
                    <button class="alertbtn" @click="submit">{{modelSave}}</button>
                </div>           
            </div>
        </div>
      </transition>
      <div v-if="modelFlag==1" class="modal-backdrop"></div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            modelFlag:0,//0为消失，1为显示
            modelTitle:'',//弹窗标题
            modelClose:'取消',//取消按钮文字
            modelContent:'',//弹窗内容
            modelSave:'确定',//确定按钮文字
            callBack:null,//是否需要回调函数
            Flag:1//取消按钮显示隐藏
        }
    },
    methods:{
        //回调函数
        doCallBack(){
            if(typeof this.callBack == 'function'){
                this.callBack()
                this.callBack=null;
            }
        },
        //关闭弹窗，数据重置
        close(){
           this.modelFlag=0;
           this.modelTitle='';
           this.modelClose='取消';
           this.modelContent='';
           this.modelSave='确定';
           this.callBack=null;
           this.Flag=1;
        },
        //点击确定按钮弹窗消失
        submit(){
            this.doCallBack()
            this.close()
        },
        //显示弹窗，记性复制
        show(options){
            if(this.modelFlag==1){return};
            this.modelTitle=options.modelTitle||this.modelTitle;//标题内容
            this.modelContent=options.modelContent;//弹窗内容
            this.modelFlag=1;// 是否显示遮罩层
            this.Flag=options.Flag||this.Flag;//隐藏一个按钮
            this.modelSave=options.modelSave||this.modelSave;//可修改确定按钮文本
            this.modelClose=options.modelClose||this.modelClose;//可修改取消按钮文本
            if(options.callBack){
                this.callBack=options.callBack;//回调函数调用
            }
        }
    },
    watch:{
       
    }
}
</script>

<!-- 添加“scoped”属性以将CSS限制到此组件 -->
<style lang="sass" scoped>
@import 'alert.scss'
</style>