/*
 * @Author: pengzhen
 * @Date:   2016-10-20 09:30:02
 * @Desc: this_is_desc
 * @Last Modified by:   pengzhen
 * @Last Modified time: 2016-10-20 10:35:49
 */

'use strict';
let loadedJSArray = [];
export default function loadJS(src, callback, multiple) {
    if (loadedJSArray.indexOf(src) === -1 || multiple) {
        var script = document.createElement('script');
        var head = document.getElementsByTagName('head')[0];
        var loaded;
        script.src = src;
        if (typeof callback === 'function') {
            script.onload = script.onreadystatechange = function() {
                if (!loaded && (!script.readyState || /loaded|complete/.test(script.readyState))) {
                    script.onload = script.onreadystatechange = null;
                    loaded = true;
                    callback();
                }
            }
        }
        head.appendChild(script);
        loadedJSArray.push(src);
    } else {
        callback();
    }
}
