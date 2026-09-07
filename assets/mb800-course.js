window.MB800={
modules:[
{id:"01",slug:"01-foundations",title:"Foundations, company setup and governance",duration:"2h 50m",level:"100–300",description:"Prepare the lab environment, create a company, manage users and profiles, migrate master data, configure workflows and introduce Copilot-enabled setup.",objectives:["Validate the Business Central lab environment","Create and configure a new company","Manage users, profiles and security context","Migrate master data into a new company","Configure approval workflows and early Copilot scenarios"],labs:[
["00","Validate the lab environment","Lab00_Validate_Lab_Environment.md","30 min","100"],
["01","Create and configure a new company","Lab01_Create_company.md","20 min","200"],
["02","Create and manage user profiles","Lab02_Create_Manage_User_Profiles.md","30 min","200"],
["03","Perform actions with Copilot","Lab03_Perform_Actions_with_Copilot.md","30 min","200"],
["04","Migrate master data","Lab04_Migrate_Master_data.md","30 min","200"],
["05","Set up and use a purchase approval workflow","Lab05_Set_up_and_use_a_purchase_approval_workflow.md","30 min","300"]]},
{id:"02",slug:"02-financial-configuration",title:"Financial configuration and reporting",duration:"5h 20m",level:"200–300",description:"Configure core financial structures and controls including costing, chart of accounts, posting groups, journals, cash management, dimensions, reporting and fiscal-year processes.",objectives:["Configure item costing and ledger options","Build the chart of accounts and posting groups","Set up accounts payable and general journals","Configure cash management and dimensions","Prepare financial reporting and manage accounting periods"],labs:[
["06","Configure item costing","Lab06_Configure_Item_Costing.md","90 min","300"],
["07","Configure the chart of accounts","Lab07_Configure_Chart_of_Accts.md","30 min","300"],
["08","Set up accounts payable","Lab08_Set_up_Accounts_Payable.md","30 min","300"],
["09","Set up general journals","Lab09_Set_up_General_Journals.md","35 min","300"],
["10","Set up cash management","Lab10_Set_up_Cash_Management.md","30 min","300"],
["11","Set up dimensions","Lab11_Set_up_dimensions.md","45 min","300"],
["12","Prepare financial reporting","Lab12_Prepare_Financial_Reporting.md","30 min","200"],
["13","Manage an accounting period","Lab13_Manage_Accounting_Period.md","30 min","300"]]},
{id:"03",slug:"03-trade-operations",title:"Trade, inventory and operational configuration",duration:"4h 20m",level:"200–300",description:"Configure purchasing, receivables, inventory and sales, then reinforce day-to-day Business Central navigation and operational tasks.",objectives:["Configure purchasing and trade settings","Set up accounts receivable master data","Configure inventory and warehouse foundations","Configure sales processes","Perform essential Business Central user tasks"],labs:[
["14","Configure purchasing","Lab14_Configure_Purchasing.md","60 min","300"],
["15","Set up accounts receivable","Lab15_Set_up_Accounts_Receivable.md","50 min","300"],
["16","Set up inventory","Lab16_Set_up_Inventory.md","60 min","300"],
["17","Configure sales","Lab17_Configure_Sales.md","60 min","300"],
["18","Perform basic Business Central tasks","Lab18_Perform_Basic_Tasks.md","30 min","200"]]},
{id:"04",slug:"04-transactions-copilot",title:"Purchasing, sales and Copilot transactions",duration:"3h 45m",level:"200–300",description:"Process purchase and sales documents end to end, then apply Copilot-assisted number series and agent capabilities to operational workflows.",objectives:["Create and process purchase documents","Create and process sales documents","Use Copilot to suggest number series","Configure Copilot and agent capabilities"],labs:[
["19","Process purchasing transactions","Lab19_Process_Purchase.md","90 min","300"],
["20","Process sales transactions","Lab20_Process_Sales.md","90 min","300"],
["21","Suggest number series with Copilot","Lab21_Suggest_Number_Series_Copilot.md","15 min","200"],
["22","Configure Copilot agent capabilities","Lab22_Configure_Copilot_Agent_Capabilities.md","30 min","300"]]},
{id:"05",slug:"05-finance-reconciliation",title:"Finance operations, reconciliation and cash management",duration:"2h 30m",level:"300",description:"Complete the course with operational finance scenarios covering journal processing, customer and vendor reconciliation, and cash-management execution.",objectives:["Perform finance operations using journals","Reconcile customer and vendor entries","Process cash-management and general-journal activities","Apply Business Central controls in end-to-end finance scenarios"],labs:[
["23","Perform finance operations","Lab23_Perform_Finance_Operations.md","60 min","300"],
["24","Reconcile customer and vendor entries","Lab24_Reconcile_Customer_Vendor.md","30 min","300"],
["25","Process cash management","Lab25_Process_Cash_Management.md","60 min","300"]]}
],
moduleById(id){return this.modules.find(m=>m.id===id)},
labByFile(file){for(const m of this.modules){const lab=m.labs.find(l=>l[2]===file);if(lab)return {module:m,lab};}return null},
renderModuleDirectory(base="./"){
 const el=document.getElementById("moduleGrid");if(!el)return;
 el.innerHTML=this.modules.map(m=>'<a class="card" href="'+base+m.slug+'/"><span class="pill">MODULE '+m.id+'</span><h3>'+m.title+'</h3><p>'+m.description+'</p><div class="meta"><span>'+m.labs.length+' labs</span><span>'+m.duration+'</span><span>Level '+m.level+'</span></div></a>').join("");
},
renderModule(id){
 const m=this.moduleById(id);if(!m)return;
 const title=document.getElementById("moduleTitle"),desc=document.getElementById("moduleDescription"),meta=document.getElementById("moduleMeta"),obj=document.getElementById("moduleObjectives"),labs=document.getElementById("moduleLabs");
 if(title)title.textContent="Module "+m.id+" — "+m.title;if(desc)desc.textContent=m.description;if(meta)meta.textContent=m.labs.length+" labs · "+m.duration+" · Level "+m.level;
 if(obj)obj.innerHTML=m.objectives.map(x=>"<li>"+x+"</li>").join("");
 if(labs)labs.innerHTML=m.labs.map(l=>'<a class="card" href="../../labs/?file='+encodeURIComponent(l[2])+'"><span class="pill">LAB '+l[0]+'</span><h3>'+l[1]+'</h3><p>Hands-on MB-800 implementation exercise.</p><div class="meta"><span>'+l[3]+'</span><span>Level '+l[4]+'</span></div></a>').join("");
 const idx=this.modules.findIndex(x=>x.id===id);const prev=document.getElementById("prevModule"),next=document.getElementById("nextModule");
 if(prev){if(idx>0){prev.href="../"+this.modules[idx-1].slug+"/";prev.textContent="← Module "+this.modules[idx-1].id}else prev.style.visibility="hidden"}
 if(next){if(idx<this.modules.length-1){next.href="../"+this.modules[idx+1].slug+"/";next.textContent="Module "+this.modules[idx+1].id+" →"}else next.href="../../"}
}
};