let DomainsMap = new Map<string, string>([
  ['womenonweb', 'womenonweb.org'],
  ['pornhub', 'pornhub.com'],
  ['hitomi', 'hitomi.la'],
  ['xvideos', 'xvideos.com']
])

function GenerateExceptionRule() {
  let Domains: Array<string> = new Array()
  document.querySelectorAll('#options input').forEach(function (element:HTMLInputElement) {
    if (element.checked) Domains.push(DomainsMap.get(element.id))
  })
  Domains = Domains.concat((document.querySelector('#options textarea#others') as HTMLTextAreaElement).value.split('\n'))
  if (Domains[Domains.length - 1] === '') Domains.pop()
  let Rule = !Domains.length ? '@@*$stealth=dpi' : `@@*$stealth=dpi,domain=~${Domains.join(',~')}`
  document.querySelector('code').innerText = Rule
}

document.querySelectorAll('#options input').forEach(function(element) {
  element.addEventListener('change', function() { 
    if (getComputedStyle(document.querySelector('textarea#others')).getPropertyValue('border-color') !== 'rgb(255, 0, 0)') GenerateExceptionRule()
  })
})

document.querySelector('textarea#others').addEventListener('input', function() {
  let Value = (document.querySelector('textarea#others') as HTMLTextAreaElement).value
  if (Value.split('\n').every(function (Line) { return /([a-z0-9-\.]+\.[a-z0-9]+\n?)+/.test(Line) }) || Value === '') {
    (document.querySelector('textarea#others') as HTMLTextAreaElement).style.removeProperty('border-color')
    GenerateExceptionRule()
  } else {
    (document.querySelector('textarea#others') as HTMLTextAreaElement).style.borderColor = 'red'
  }
})