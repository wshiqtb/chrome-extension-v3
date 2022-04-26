<template>
  <div>
    <a-modal v-model="visible" :closable="false" :footer="null">
      上传进度：
      <a-progress
        :stroke-color="{
          '0%': '#108ee9',
          '100%': '#87d068',
        }"
        status="active"
        :percent="percent"
        :format="format"
      />
    </a-modal>
  </div>
</template>

<script>
let _speed = 0.18;
let _limit = 90;
let _timer = null;

export default {
  data () {
    return {
      visible: false,
      percent: 0
    }
  },
  methods: {
    format(percent){
      return Math.floor(percent) + '%';
    },
    start ({speed=0.18, limit=90}={}) {
      this.visible = true
      _speed = speed;
      _limit = limit;
      this.setTimer();
    },
    setTimer(){
      _timer = setInterval(()=>{
        if(this.percent >= _limit){
          _timer && clearInterval(_timer)
        }
        this.percent += _speed
      }, 16)
    },
    end(){
      this.percent = 100;
      _timer && clearInterval(_timer)
      this.visible = false;
      this.percent = 0;
    },
    handleOk () {
      this.visible = false
    }
  }
}
</script>

<style>

</style>
