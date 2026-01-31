const CSDict = {
  "dark": {
    "svg_str": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>				
               `,
    "css_class": "color-scheme-night",
    "canvasBgHexColor": "#222121"
  },
  "white": {
    "svg_str": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
               `,
    "css_class": "color-scheme-day",
    "canvasBgHexColor": "#dddddd"
  },
  "commonality": {
    "svg_str": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
               `,
    "css_class": "color-scheme-commonality",
    "canvasBgHexColor": "#DFC7BC"
  }
}
const CSKeys = ["dark", "white", "commonality"]
const defaultColorScheme = "dark";
var currentScheme = 0

function colorSchemeSwitch() {
  var nextColorScheme = (currentScheme+1) % CSKeys.length
  var schemeName = CSKeys[nextColorScheme]
  var scheme = CSDict[schemeName]

  const iconDiv = document.getElementById('colorSchemeIconDiv')
  if(!iconDiv) return

  iconDiv.innerHTML = scheme.svg_str

  document.documentElement.classList.remove(CSDict[CSKeys[currentScheme]].css_class)
  document.documentElement.classList.add(scheme.css_class)

  currentScheme = nextColorScheme
}

function colorSchemeSet(name) {
  var i = CSKeys.findIndex(key => key == name);
  if( i != -1){
    var scheme = CSDict[name]

    const iconDiv = document.getElementById('colorSchemeIconDiv')
    if(!iconDiv) return

    iconDiv.innerHTML = scheme.svg_str
    document.documentElement.classList.remove(CSDict[CSKeys[currentScheme]].css_class)
    document.documentElement.classList.add(scheme.css_class)

    currentScheme = i;
  }
}

function colorSchemeSetCookie(){
  const cookie = getCookie("colorScheme_");
  if(cookie !== ""){
    colorSchemeSet(cookie);
  } else {
    colorSchemeSet(defaultColorScheme);
    setCookie("colorScheme_", CSKeys[currentScheme], 365);
  }
}

function colorSchemeSwitchCookie(){
  const cookie = getCookie("colorScheme_");
  if(cookie !== ""){
    colorSchemeSwitch();
    colorSchemeSet(CSKeys[currentScheme]);
    setCookie("colorScheme_", CSKeys[currentScheme], 365);
  } else {
    colorSchemeSet(defaultColorScheme);
    setCookie("colorScheme_", CSKeys[currentScheme], 365);
  }
}
