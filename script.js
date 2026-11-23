const menu=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));document.getElementById('year').textContent=new Date().getFullYear();document.getElementById('lead-form').addEventListener('submit',e=>{e.preventDefault();document.getElementById('form-note').textContent='Это пока макет формы: заявки ещё не отправляются. Подключим приём заявок после согласования рабочего номера WhatsApp или другого канала.';});
const aiLauncher=document.getElementById('ai-launcher');
const aiPanel=document.getElementById('ai-panel');
const aiClose=document.getElementById('ai-close');
const aiMessages=document.getElementById('ai-messages');
const aiForm=document.getElementById('ai-form');
const aiInput=document.getElementById('ai-input');
function toggleAssistant(open){aiPanel.hidden=!open;aiLauncher.setAttribute('aria-expanded',String(open));if(open)aiInput.focus();}
aiLauncher.addEventListener('click',()=>toggleAssistant(aiPanel.hidden));
aiClose.addEventListener('click',()=>toggleAssistant(false));
function addAiMessage(text,kind){const node=document.createElement('div');node.className='ai-message '+kind;node.textContent=text;aiMessages.appendChild(node);aiMessages.scrollTop=aiMessages.scrollHeight;}
function demoReply(message){const q=message.toLowerCase();if(/магнит|teyes|андроид|android/.test(q))return 'С удовольствием помогу с подбором! Напиши марку, модель и год автомобиля. Затем уточним, что важнее: бюджетный вариант, хороший экран или максимальная производительность. Это демо-консультация — совместимость подтвердит специалист.';if(/защит|плён|свет|фар|bi-led|линз/.test(q))return 'По защите и свету можем обсудить бронеплёнку, Bi-LED линзы и восстановление фар. Расскажи, пожалуйста, марку и модель автомобиля и что именно хочешь улучшить.';if(/салон|хром|электрон/.test(q))return 'Поможем сориентироваться по обновлению салона, восстановлению хрома и автомобильной электронике. Опиши автомобиль и желаемый результат — подскажем, какие детали нужно уточнить у мастера.';return 'Я помогу сориентироваться по услугам KarTuningKZ. Расскажи немного подробнее об автомобиле и задаче. Если понадобится точная цена, наличие или запись, это подтвердит специалист.';}
function sendAiMessage(message){const clean=message.trim();if(!clean)return;addAiMessage(clean,'user');aiInput.value='';window.setTimeout(()=>addAiMessage(demoReply(clean),'bot'),350);}
aiForm.addEventListener('submit',e=>{e.preventDefault();sendAiMessage(aiInput.value);});
document.querySelectorAll('.ai-quick button').forEach(button=>button.addEventListener('click',()=>sendAiMessage(button.dataset.prompt)));
