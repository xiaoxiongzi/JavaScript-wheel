//图片预加载
(function () {
    function preLoad(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, preLoad.DEFAULTS, options)
        //加下划线是为了表示这个方法只在内部调用，不提供外部使用
        this._unordered();
    }
    preLoad.DEFAULTS = {
        each: null, //每一个图片加载完毕后执行
        all: null //所有图片加载后执行
    }
    preLoad.prototype._unordered = function () {
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {
            //src不符合要求是返回
            if (typeof src != 'string') return
            var imgObj = new Image();
            $(imgObj).on('load error', function () {
                //each 为空时返回，不为空时执行
                opts.each && opts.each(count);
                if (count >= len - 1) {
                    //each 为空时返回，不为空时执行
                    opts.all && opts.all()
                }
                count++;
            })
            imgObj.src = src;
        });
    };
    $.extend({
        preload: function (imgs, opts) {
            new preLoad(imgs, opts);
        }
    })


})(jQuery);