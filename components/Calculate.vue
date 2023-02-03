<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
        <p class="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
      </div>
    </div>
    <div class="mt-5 md:col-span-2 md:mt-0">
      <div class="shadow sm:overflow-hidden sm:rounded-md">
        <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="col-span-2 sm:col-span-1">
              <label for="company-website" class="block text-sm font-medium text-gray-700">Зарплата</label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input id="company-website" v-model="salary" type="number" name="company-website" class="block w-full flex-1 rounded-none rounded-l-md rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="50000">
              </div>
              <p id="email-description" class="mt-2 text-sm text-gray-500">До уплаты подоходного налога</p>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="calculate">Рассчитать</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import divide from "lodash/divide";
import multiply from "lodash/multiply";
import difference from "lodash/difference";

import CALENDAR from '@/services/mock/calendaries/2023.json'

export default {
  name: "Calculate",
  data: () => ({
    salary: null,
    year: 2023,
    payday: 10,
    advanceDay: 25,
    data: null,
  }),
  computed: {
    url: (vm) =>
      `https://raw.githubusercontent.com/xmlcalendar/xmlcalendar.github.io/main/data/ru/${vm.year}/calendar.json`,
    calendarData: () => CALENDAR,
  },
  methods: {
    calculate() {
      this.data = this.calendarData.months?.map((item) => {
        const { days, month } = item;
        const holidays = days.split(',').map((day) => parseInt(day, 10));
        const holidaysCount = holidays.length;
        const lastDayOfMonth = new Date(this.year, month, 0).getDate();
        const allDaysInMonth = new Array(lastDayOfMonth).fill(0).map((item, idx) => ++idx);
        const workdays = difference(allDaysInMonth, holidays);
        const workdaysCount = workdays.length;
        const paydays = [this.payday, this.advanceDay].map((payday) => this.getPayDay(holidays, payday))
        const dayCost = divide(this.salary, workdaysCount);
        const firstHalfWorkDays = workdays.filter((day) => day <= 15);
        const secondHalfWorkDays = workdays.filter((day) => day > 15);
        const paydaysSalary = [firstHalfWorkDays, secondHalfWorkDays].map((days) => multiply(multiply(dayCost, days.length), 0.87));

        item = {
          month,
          year: this.year,
          holidays,
          workdays,
          holidaysCount,
          workdaysCount,
          paydays,
          paydaysSalary,
        };

        return item;
      })
    },
    getPayDay(holidays, payday) {
      if (payday < 1) {
        return null
      }
      if (holidays.includes(payday)) {
        return this.getPayDay(holidays, payday - 1)
      }

      return payday
    },
  },
}
</script>

<style scoped>

</style>
