function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    const aVal = a[key];
    const bVal = b[key];
    // query values can be null and undefined
    if (aVal == null || bVal == null) { return aVal === bVal }
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

const isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

function findAnchor (children) {
  if (children) {
    let child;
    for (let i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

function compareVersion(v1, v2) {
  const arr1 = v1.split(".");
  const arr2 = v2.split(".");
  //获取最大数组长度
  const maxLen = arr1.length > arr2.length ? arr1.length : arr2.length;

  for (let i = 0; i < maxLen; i++) {
    //转换数字
    const p1 = arr1[i] >> 0 || 0;
    const p2 = arr2[i] >> 0 || 0;
    if (p1 > p2) {
      return true;
    } else if (p1 < p2) {
      return false;
    }
  }
  return true;
}

function downloadByBlob(fileName, content) {
  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  });

  const reader = new FileReader();
  reader.readAsDataURL(blob);

  reader.onload = function(e) {
    const a = document.createElement("a");
    a.download = fileName;
    a.href = e.target.result;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
