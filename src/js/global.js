if (typeof Meteor === 'object') { // Meteor
  if (typeof EqUI === "undefined") {
    EqUI = {};
  }
  if(typeof global !== "undefined" && typeof global.EqUI === "undefined"){global.EqUI = EqUI;}
  if(typeof window !== "undefined" && typeof window.EqUI === "undefined"){window.EqUI = EqUI;}
} else { // Node / Browser
  if(typeof global !== "undefined" && typeof global.EqUI === "undefined"){global.EqUI = {};}
  if(typeof window !== "undefined" && typeof window.EqUI === "undefined"){window.EqUI = {};}
}

// Unique ID
EqUI.guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

EqUI.elementOrParentIsFixed = function(element) {
    var $element = $(element);
    var $checkElements = $element.add($element.parents());
    var isFixed = false;
    $checkElements.each(function(){
        if ($(this).css("position") === "fixed") {
            isFixed = true;
            return false;
        }
    });
    return isFixed;
};

EqUI.mutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null;

// Velocity has conflicts when loaded with jQuery, this will check for it
var Vel;
if ($) {
  Vel = $.Velocity;
}
else {
  Vel = Velocity;
}
