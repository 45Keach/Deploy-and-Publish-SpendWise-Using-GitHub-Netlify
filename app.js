const STORAGE_KEY = "spendwise-transactions-v1";
const initialTransactions = [
  {id:1,name:"Monthly salary",category:"Salary",date:"2026-11-01",amount:5200,type:"income",icon:"↙",color:"#e8f2ff"},
  {id:2,name:"Grocery Market",category:"Food",date:"2026-11-09",amount:128.50,type:"expense",icon:"⌂",color:"#e8f7ef"},
  {id:3,name:"Uber ride",category:"Transport",date:"2026-11-08",amount:24.00,type:"expense",icon:"↗",color:"#fff1e5"},
  {id:4,name:"Netflix subscription",category:"Entertainment",date:"2026-11-07",amount:15.99,type:"expense",icon:"▶",color:"#f0edff"},
  {id:5,name:"New sneakers",category:"Shopping",date:"2026-11-05",amount:89.00,type:"expense",icon:"◇",color:"#fff0f0"},
  {id:6,name:"Electricity bill",category:"Housing",date:"2026-11-03",amount:76.50,type:"expense",icon:"⌁",color:"#fff6df"},
  {id:7,name:"Coffee Corner",category:"Food",date:"2026-11-02",amount:8.50,type:"expense",icon:"☕",color:"#e8f7ef"}
];
const categories = {
  Food:{color:"#79d3ae",symbol:"⌂",budget:400},Transport:{color:"#79b9e8",symbol:"↗",budget:180},
  Shopping:{color:"#f0b46f",symbol:"◇",budget:250},Housing:{color:"#a99af5",symbol:"⌂",budget:700},
  Entertainment:{color:"#e99bba",symbol:"▶",budget:120},Health:{color:"#83c6c5",symbol:"✚",budget:150},Other:{color:"#aab4c2",symbol:"＋",budget:100}
};
let transactions = loadTransactions();
function loadTransactions(){try{const saved=localStorage.getItem(STORAGE_KEY);return saved?JSON.parse(saved):initialTransactions.map(x=>({...x}));}catch{return initialTransactions.map(x=>({...x}));}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(transactions));}
function money(value){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(value);}
function prettyDate(value){return new Date(value+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});}
function totals(){const income=transactions.filter(x=>x.type==="income").reduce((s,x)=>s+x.amount,0);const spending=transactions.filter(x=>x.type==="expense").reduce((s,x)=>s+x.amount,0);return{income,spending,balance:8450+income-5200-spending+1740};}
function renderSummary(){const t=totals();document.querySelector("#balance").textContent=money(t.balance);document.querySelector("#income").textContent=money(t.income);document.querySelector("#spending").textContent=money(t.spending);document.querySelector("#savings-rate").textContent=(t.income?Math.max(0,(t.income-t.spending)/t.income*100):0).toFixed(1)+"%";document.querySelector("#donut-total").textContent=money(t.spending).replace(".00","");document.querySelector("#spend-progress").style.width=Math.min(100,t.spending/2800*100)+"%";}
function renderBreakdown(){const expenses=transactions.filter(x=>x.type==="expense");const sums={};expenses.forEach(x=>sums[x.category]=(sums[x.category]||0)+x.amount);const entries=Object.entries(sums).sort((a,b)=>b[1]-a[1]);const total=expenses.reduce((s,x)=>s+x.amount,0);let cursor=0;const palette=entries.map(([name])=>categories[name]?.color||"#aab4c2");const stops=entries.map(([name,value],i)=>{const start=cursor;cursor+=total?value/total*100:0;return palette[i]+" "+start+"% "+cursor+"%";});document.querySelector("#donut").style.background=stops.length?"conic-gradient("+stops.join(",")+")":"#edf0f4";document.querySelector("#legend").innerHTML=entries.map(([name,value],i)=>'<div class="legend-item"><i class="legend-dot" style="background:'+palette[i]+'"></i><span>'+escapeHtml(name)+'</span><strong>'+money(value)+'</strong></div>').join("")||'<span class="muted">No expenses yet</span>';}
function renderBudgets(){const sums={};transactions.filter(x=>x.type==="expense").forEach(x=>sums[x.category]=(sums[x.category]||0)+x.amount);const rows=Object.entries(categories).filter(([name])=>sums[name]||["Food","Transport","Shopping","Housing"].includes(name));document.querySelector("#budget-list").innerHTML=rows.map(([name,meta])=>{const value=sums[name]||0;const pct=Math.min(100,value/meta.budget*100);return '<div><div class="budget-row-head"><span class="budget-name"><i class="budget-symbol" style="background:'+meta.color+'25;color:'+meta.color+'">'+meta.symbol+'</i>'+name+'</span><span class="budget-value"><strong>'+money(value)+'</strong> / '+money(meta.budget)+'</span></div><div class="budget-track"><div class="budget-fill" style="width:'+pct+'%;background:'+meta.color+'"></div></div></div>';}).join("");}
function renderTransactions(){const query=document.querySelector("#search").value.toLowerCase();const filter=document.querySelector("#filter").value;const list=transactions.filter(x=>(filter==="all"||x.type===filter)&&(x.name.toLowerCase().includes(query)||x.category.toLowerCase().includes(query))).sort((a,b)=>b.date.localeCompare(a.date));document.querySelector("#transaction-rows").innerHTML=list.map(x=>'<tr><td><div class="merchant-cell"><span class="merchant-icon" style="background:'+escapeHtml(x.color||"#f1f3f6")+'">'+escapeHtml(x.icon||"•")+'</span>'+escapeHtml(x.name)+'</div></td><td><span class="category-pill">'+escapeHtml(x.category)+'</span></td><td>'+prettyDate(x.date)+'</td><td class="amount-cell '+(x.type==="income"?"income":"")+'">'+(x.type==="income"?"+":"−")+money(x.amount)+'</td></tr>').join("");document.querySelector("#empty-state").hidden=list.length>0;}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(){renderSummary();renderBreakdown();renderBudgets();renderTransactions();}
function toast(message){const el=document.querySelector("#toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400);}
const dialog=document.querySelector("#transaction-dialog");const form=document.querySelector("#transaction-form");
function openDialog(){form.reset();form.elements.date.value=new Date().toISOString().slice(0,10);dialog.showModal();}
document.querySelector("#add-top").addEventListener("click",openDialog);
document.querySelector("#search").addEventListener("input",renderTransactions);
document.querySelector("#filter").addEventListener("change",renderTransactions);
document.querySelector("#reset-data").addEventListener("click",()=>{transactions=initialTransactions.map(x=>({...x}));save();render();toast("Demo transactions restored.");});
form.addEventListener("submit",event=>{if(event.submitter?.value==="cancel")return;event.preventDefault();const data=new FormData(form);const amount=Number(data.get("amount"));if(!Number.isFinite(amount)||amount<=0){toast("Enter an amount greater than zero.");return;}const category=data.get("category");const meta=categories[category]||{symbol:"＋",color:"#aab4c2"};transactions.push({id:Date.now(),name:data.get("description").trim(),category,date:data.get("date"),amount,type:data.get("type"),icon:meta.symbol,color:meta.color});save();render();dialog.close();toast("Transaction added successfully.");});
render();