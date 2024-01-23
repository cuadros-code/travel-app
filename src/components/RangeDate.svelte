<script>
  import { onMount } from 'svelte';

  let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
  let isOpenCalendar = false;
  let currentDate = new Date();
  let currentDay  = currentDate.getDate();
  let monthNumber = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let dates = [];

  function handleFocus( e ) {
    console.log(e);
    isOpenCalendar = true;
  }

  function create() {

  }

  function startDay () {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
  }

  function isLeap () {
    return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
  }

  function getTotalDays (month) {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return isLeap() ? 29:28;
    }
  } 

  const writeMonth = (month) => {
    dates = []; // Reset the dates array

    // Add the last days of the previous month
    for (let i = startDay(); i > 0; i--) {
      dates.push({
        day: getTotalDays(month - 1) - (i - 1),
        className: 'text-white'
      });
    }

    // Add the days of the current month
    for (let i = 1; i <= getTotalDays(month); i++) {
      dates.push({
        day: i,
        className: 'text-center'
      });
    }
  }

  const lastMonth = () => {
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    writeMonth(monthNumber)
  }

  const nextMonth = () => {
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }

    writeMonth(monthNumber)
  }

  onMount( () => {
    writeMonth(monthNumber)
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

{#if isOpenCalendar}  
  <div class="flex gap-8">
    <div class="calendar">
      <div class="flex items-center justify-center">
          <button on:click={lastMonth} class="text-left" id="prev-month">&#9664;</button>
          <div class="text-center" id="month">{monthNames[monthNumber]}</div>
          <div class="calendar__year" id="year">{currentYear}</div>
      </div>
    
      <div class="grid gap-2 grid-cols-7">
          <div class="text-center">Lun.</div>
          <div class="text-center">Mar.</div>
          <div class="text-center">Mié.</div>
          <div class="text-center">Jue.</div>
          <div class="text-center">Vié.</div>
          <div class="text-center">Sáb.</div>
          <div class="text-center">Dom.</div>
      </div>
    
      <div class="grid gap-2 grid-cols-7">
        {#each dates as { day, className }}
        <div 
          class={`${className} flex justify-center items-center h-9 w-9 cursor-pointer border border-transparent hover:border-black rounded-full`}
        >{day}</div>
      {/each}
      </div>
    </div>

    <div class="calendar">
      <div class="flex items-center justify-center">
          <div class="calendar__month" id="month">{monthNames[monthNumber + 1]}</div>
          <div class="calendar__year" id="year">{currentYear}</div>
          <button on:click={nextMonth} class="calendar__next" id="next-month">&#9654;</button>
      </div>
    
      <div class="grid gap-2 grid-cols-7">
          <div class="text-center">Lun.</div>
          <div class="text-center">Mar.</div>
          <div class="text-center">Mié.</div>
          <div class="text-center">Jue.</div>
          <div class="text-center">Vié.</div>
          <div class="text-center">Sáb.</div>
          <div class="text-center">Dom.</div>
      </div>
    
      <div class="grid gap-2 grid-cols-7" id="dates">
        {#each dates as { day, className }}
          <div 
            class={`${className} flex justify-center items-center h-9 w-9 cursor-pointer border border-transparent hover:border-black rounded-full`}
          >{day}</div>
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
