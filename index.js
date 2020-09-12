const burger = document.querySelector('#burger');
const menu = document.querySelector('#menu');

if (localStorage.getItem('KAVINSITECURRENT')) {
    if (document.getElementById(localStorage.getItem('KAVINSITECURRENT')).classList.contains('hidden')) {
        document.getElementById(localStorage.getItem('KAVINSITECURRENT')).classList.remove('hidden')
    }
    const navItems = document.querySelectorAll('#menu li');
    const allPages = document.querySelectorAll('.pages');
    for (let i = 0; i < allPages.length; i++) {
        if (allPages[i].getAttribute('id') !== localStorage.getItem('KAVINSITECURRENT')) {
            if (!allPages[i].classList.contains('hidden')) {
                allPages[i].classList.add('hidden')
            }
        }
    }
    for (let i = 0; i < navItems.length; i++) {
        if (navItems[i].querySelector('a').getAttribute('target-div') ===  localStorage.getItem('KAVINSITECURRENT')) {
            if (navItems[i].querySelector('a').classList.contains('border-white')) {
                navItems[i].querySelector('a').classList.remove('border-white');
                navItems[i].querySelector('a').classList.add('border-primary');
                navItems[i].classList.add('text-gray-700');
                navItems[i].classList.add('font-bold');
            }
        }  else {
            if (navItems[i].querySelector('a').classList.contains('border-primary')) {
                navItems[i].querySelector('a').classList.remove('border-primary');
                navItems[i].querySelector('a').classList.add('border-white');
                navItems[i].classList.remove('text-gray-700');
                navItems[i].classList.remove('font-bold');
            }
        }
    }
}

burger.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
        // menu.slideDown()
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden')
    }
})

const navItems = document.querySelectorAll('#menu li');
navItemsActive = []
for (let i = 0; i < navItems.length; i++) {
    if (navItems[i].querySelector('a').classList.contains('border-primary')) {
        navItemsActive.push(navItems[i])
    }
    navItems[i].addEventListener('click', () => {
        const linkItem = navItems[i].querySelector('a')
        if (linkItem.classList.contains('border-white')) {
            linkItem.classList.remove('border-white');
            linkItem.classList.add('border-primary');
            navItems[i].classList.add('text-gray-700');
            navItems[i].classList.add('font-bold');
            let targetDivId = linkItem.getAttribute('target-div');
            localStorage.setItem('KAVINSITECURRENT',targetDivId);
            navItemsActive[0].querySelector('a').classList.remove('border-primary');
            navItemsActive[0].classList.remove('text-gray-700');
            navItemsActive[0].classList.remove('font-bold');
            navItemsActive[0].querySelector('a').classList.add('border-white');
            let toCloseDivId = navItemsActive[0].querySelector('a').getAttribute('target-div');
            let targetDiv = document.getElementById(targetDivId);
            let toCloseDiv = document.getElementById(toCloseDivId);
            toCloseDiv.classList.add('hidden');
            targetDiv.classList.remove('hidden');
            navItemsActive=[]
            navItemsActive.push(navItems[i])
        }
    })
}