// components/preview/index.js
Component({
  properties: {
    classic: {
      type: Object,
      observer: function(newVal) {
        if (newVal) {
          var typeText = {
            100: '电影',
            200: '音乐',
            300: '句子'
          }[newVal.type]
        }
        this.setData({
          typeText: typeText
        })
      }
    }
  },
  data: {
    typeText: String
  },
  attached() {
    // 在组件实例进入页面节点树时执行
    //console.log(this.properties.classic)
  },
  methods: {
    onTap: function() {
      this.triggerEvent( // 注意 catchtap 与 bindtap 的区别
        'tap',
        {
          cid: this.properties.classic.id,
          type: this.properties.classic.type
        },
        {}
      )
    }
  }
})
