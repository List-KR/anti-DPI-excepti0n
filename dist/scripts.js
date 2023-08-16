"use strict";
let DomainsMap = new Map([
    ['womenonweb', 'womenonweb.org'],
    ['pornhub', 'pornhub.com'],
    ['hitomi', 'hitomi.la'],
    ['xvideos', 'xvideos.com']
]);
function GenerateExceptionRule() {
    let Domains = new Array();
    document.querySelectorAll('#options input').forEach(function (element) {
        if (element.checked)
            Domains.push(DomainsMap.get(element.id));
    });
    Domains = Domains.concat(document.querySelector('#options textarea#others').value.split('\n'));
    if (Domains[Domains.length - 1] === '')
        Domains.pop();
    let Rule = !Domains.length ? '@@*$stealth=dpi' : `@@*$stealth=dpi,domains=~${Domains.join(',~')}`;
    document.querySelector('code').innerText = Rule;
}
document.querySelectorAll('#options input').forEach(function (elmeent) {
    elmeent.addEventListener('change', function () {
        if (getComputedStyle(document.querySelector('textarea#others')).getPropertyValue('border-color') !== 'rgb(255, 0, 0)')
            GenerateExceptionRule();
    });
});
document.querySelector('textarea#others').addEventListener('input', function () {
    if (/([a-z0-9-\.]+\.[a-z0-9]+\n?)+/.test(document.querySelector('textarea#others').value)) {
        document.querySelector('textarea#others').style.removeProperty('border-color');
        GenerateExceptionRule();
    }
    else {
        document.querySelector('textarea#others').style.borderColor = 'red';
    }
});
