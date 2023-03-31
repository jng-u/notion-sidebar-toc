var firstCreate = true;
var created = false;
function createSidebarToc() {
    var tocBlock = document.querySelector('.notion-scroller .notion-page-content .notion-table_of_contents-block');
    if (tocBlock == null) return;

    var notionFrame = document.querySelector('.notion-frame');
    notionFrame.style.setProperty('flex-direction', 'row');
    var tocDiv = document.createElement('div');
    tocDiv.setAttribute('class', 'notion-page-content sidebar-toc');
    tocDiv.setAttribute('style', 'min-width: 240px; height: 100%; padding: 8px 8px 0px;');
    notionFrame.appendChild(tocDiv);
    
    if (firstCreate) document.querySelector('body style').innerHTML += '.sidebar-toc a:hover{background: rgba(255, 255, 255, 0.055)}';
    var tocTitle = document.createElement('div');
    var tocClone = document.querySelector('.notion-scroller .notion-page-content .notion-table_of_contents-block').cloneNode(true);
    tocTitle.innerHTML = 'Table of Contents';
    tocTitle.style.setProperty('font-weight', 'bold');
    tocTitle.style.setProperty('font-size', '20px');
    tocDiv.appendChild(tocTitle);
    tocDiv.appendChild(tocClone);

    // var tocBlock = document.querySelector('.notion-scroller .notion-page-content .notion-table_of_contents-block');
    tocBlock.addEventListener('DOMSubtreeModified', function() {
        var tocDiv = document.querySelector('.sidebar-toc');
        if (tocDiv == null) return;
    
        var clone = this.cloneNode(true);
        if (tocDiv.childNodes.length > 1)
            tocDiv.removeChild(tocDiv.childNodes[1]);
        tocDiv.appendChild(clone);
    });

    if (firstCreate) {
        var observer = new MutationObserver(function(mutations, observer) {
            if (document.querySelector('.notion-scroller .notion-page-content .notion-table_of_contents-block') == null) {
                console.log("toc removed");
                destroySidebarToc();
            }
        });
        observer.observe(tocBlock.parentNode, {childList: true});

        firstCreate = false;
    }
    created = true;
}

function destroySidebarToc(){
    var notionFrame = document.querySelector('.notion-frame');
    var tocDiv = document.querySelector('.sidebar-toc');
    notionFrame.removeChild(tocDiv);
    created = false;
}

var node = document.querySelector(".notion-topbar-action-buttons .notion-topbar-share-menu");
var tocBtn = node.cloneNode(true);
tocBtn.innerHTML = 'TOC';
tocBtn.removeAttribute('class');
tocBtn.setAttribute('class', 'notion-topbar-toc-button');
tocBtn.onclick = function() {
    if (!created)
        createSidebarToc();
    else 
        destroySidebarToc();
}

node.parentNode.insertBefore(tocBtn, node);
document.querySelector('body style').innerHTML += '.notion-topbar-toc-button:hover{background: rgba(255, 255, 255, 0.055)}';

// createSidebarToc();