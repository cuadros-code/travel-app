<script>
  import { onMount } from 'svelte';
  import { monthNames, daysNames } from '../constants/date'
  import { getTotalDays, Click } from '../utils/calendar-utilities'
  
 
  let isOpenCalendar = false;
  let canBackMonth = 0;
  let currentDate = new Date();
  let monthNumber = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let leftCalendar = [];
  let rigthCalendar = [];

  function handleFocus( e ) {
    isOpenCalendar = true;
  }

  function create() {}

  function startDay (month) {
    let start = new Date(currentYear, month, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
  }

  function writeMonth (month) {
    let dates = [];

    for (let i = startDay(month); i > 0; i--) {
      dates.push({
        day: getTotalDays(currentYear, month),
        className: 'text-white'
      });
    }

    for (let i = 1; i <= getTotalDays(currentYear, month); i++) {
      dates.push({
        day: i,
        className: 'text-center'
      });
    }
    return dates;
  }

  function lastMonth () {
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }
    leftCalendar = writeMonth(monthNumber)
    rigthCalendar = writeMonth(monthNumber + 1)

    if(canBackMonth > 0){
      canBackMonth += Click.Back;
    }
    
  }

  function nextMonth () {
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }
    leftCalendar = writeMonth(monthNumber);
    rigthCalendar = writeMonth(monthNumber + 1);
    canBackMonth += Click.Next;
  }

  onMount( () => {
    leftCalendar = writeMonth(monthNumber)
    rigthCalendar = writeMonth(monthNumber + 1)
  });


</script>

<div class="flex p-1 w-fit gap-3 border-solid border rounded-full border-gray-300">
  <button on:focus={handleFocus} class="py-2 px-4 rounded-full cursor-pointer hover:bg-gray-200">
    <div class="text-left text-xs font-bold">
      llegada
    </div>
    <div class="text-sm">
      Agregar fecha de llegada
    </div>
  </button>

  <button on:focus={handleFocus} class="py-2 px-4 rounded-full cursor-pointer hover:bg-gray-200">
    <div class="text-left text-xs font-bold">
      Salida
    </div>
    <div class="text-sm">
      Agregar fecha de salida
    </div>
  </button>

  <button title="Crear itinerario" on:click={create} class="search flex justify-center items-center bg-black rounded-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
      <path fill="#ffffff" d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12"/>
    </svg>
  </button>

</div>

{#if true}  
  <div class="flex gap-8 shadow-gray-300 shadow-xl w-fit p-10 rounded-xl">
    <div class="calendar">
      <div class="flex items-center justify-center gap-1 relative mb-2">
          {#if canBackMonth !== 0}
            <button on:click={lastMonth} class="absolute left-0">&#9664;</button>
          {/if}
          <div>{monthNames[monthNumber]}</div>
          <div>{currentYear}</div>
      </div>
      <div class="grid gap-2 grid-cols-7">
          {#each daysNames as day }
            <div class="text-center">{day}</div>
          {/each}
      </div>
    
      <div class="grid gap-2 grid-cols-7">
        {#each leftCalendar as { day, className }}
          <div class={`${className} flex justify-center items-center h-9 w-9 cursor-pointer
            border-2 border-transparent hover:border-black rounded-full`}>{day}</div>
        {/each}
      </div>
    </div>

    <div class="calendar">
      <div class="flex items-center justify-center gap-1 relative mb-2">
          <div>{monthNames[monthNumber + 1]}</div>
          <div>{currentYear}</div>
          <button on:click={nextMonth} class="absolute right-0">&#9654;</button>
      </div>
    
      <div class="grid gap-2 grid-cols-7">
        {#each daysNames as day }
          <div class="text-center">{day}</div>
        {/each}
      </div>
    
      <div class="grid gap-2 grid-cols-7" id="dates">
        {#each rigthCalendar as { day, className }}
          <div 
            class={`${className} flex justify-center items-center h-9 w-9 cursor-pointer 
              border-2 border-transparent hover:border-black rounded-full`}>{day}</div>
        {/each}
      </div>
    </div>
  </div>
{/if}



<style>
  .search{
    width: 52px;
  }
</style>
