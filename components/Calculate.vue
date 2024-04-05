<template>
  <div class="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
    <div class="col-span-1 order-2 md:-order-1">
      <div class="px-4 sm:px-0 md:sticky top-5">
        <h3 class="text-lg font-medium leading-6 text-gray-900 my-5">Как рассчитывается зарплата?</h3>
        <p class="mt-1 text-sm text-gray-600">Наш калькулятор рассчитывает размер и дату аванса и зарплаты в 2023 году.</p>
        <p class="mt-1 text-sm text-gray-600 mb-4">Расчет происходит по следующим формулам:</p>
        <p class="mt-1 text-sm text-gray-600 mb-2 italic">
          Аванс = (оклад/количество рабочих дней) × количество отработанных дней за 1-ю половину месяца − 13%
        </p>
        <p class="mt-1 text-sm text-gray-600 mb-4 italic">
          Зарплата = (оклад/количество рабочих дней) × количество отработанных дней за 2-ю половину месяца − 13%
        </p>
        <p class="mt-1 text-sm text-gray-600 mb-7">Для упрощения точные даты выплат зарплаты и аванса зафиксировали на 10 и 25 числа соответственно. Если дата выплаты попадает на выходной или праздничный день, то она смещается на предыдущий рабочий день.</p>
        <p class="mt-1 text-sm text-gray-600 mb-4 italic underline">Пример</p>
        <p class="mt-1 text-sm text-gray-600 mb-4 italic">Количество рабочих дней в январе 2023 года — 17, оклад инженера Петрова И. И. составляет 40 000 руб. в месяц. За вторую половину месяца Петров И. И. отработал 12 дней. Таким образом, ему должна быть выплачена зарплата 10 февраля в сумме:</p>
        <p class="mt-1 text-sm text-gray-600 mb-4 italic">З = (40 000 руб. / 17 дн.) × 12 дн. - 13% = 24 564.71 руб.</p>
        <p class="mt-1 text-sm text-gray-600 mb-4 italic">Количество рабочих дней в феврале 2023 года — 17. За первую половину месяца Петров И. И. отработал 11 дней. Таким образом, ему должен быть выплачен аванс 21 числа в сумме:</p>
        <p class="mt-1 text-sm text-gray-600 mb-4 italic">А = (40 000 руб. / 17 дн.) × 11 дн. - 13% = 22 517.65 руб.</p>
      </div>
    </div>

    <div class="sm:col-span-1 md:col-span-2">

      <div class="bg-white overflow-hidden shadow rounded-md">
        <div class="border-b border-gray-200 px-4 py-5 sm:p-6">
          <h1 class="text-2xl mb-5 font-medium leading-6 text-gray-900">Калькулятор зарплаты</h1>
          <h3 class="text-base font-medium leading-6 text-gray-900">Оклад</h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>Введите сумму оклада до вычета подоходного налога</p>
          </div>
          <form class="mt-3 sm:flex sm:items-center">
            <div class="w-full sm:max-w-xs">
              <label for="salary" class="sr-only">Оклад</label>
              <input v-money="modeyDirectiveOptions" v-model="salary" @keyup.enter="calculate" type="text" name="salary" id="salary" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="40 000">
            </div>
            <button type="submit" class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto" @click.prevent.stop="calculate">Рассчитать</button>
          </form>
        </div>

        <div v-if="data" class="space-y-6 bg-white px-4 py-0 md:p-6 md:py-5">
          <div class="flex flex-col">
            <div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6">Дата</th>
                      <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6">Сумма</th>
                      <th scope="col" class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-right text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6">
                        <span class="sr-only">Добавить в календарь</span>
                      </th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="(item, idx) in sortedData" :key="idx">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6">{{ item.date }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500">{{ getPrice(item.salary) }}</td>
                      <td class="whitespace-nowrap py-4 pl-3 pr-4 sm:pr-6 flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-indigo-600 hover:text-indigo-900 cursor-pointer" @click="addToCalendar(item.date)">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                        </svg>
                      </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                      <th scope="row" colspan="1" class="hidden py-4 pl-4 pr-3 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-6">Итого</th>
                      <th class="whitespace-nowrap px-3 py-4 text-right text-sm font-semibold text-gray-900">{{ getPrice(totalSalary) }}</th>
                    </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import map from "lodash/map";
import sortBy from "lodash/sortBy";
import reduce from "lodash/reduce";
import concat from "lodash/concat";
import divide from "lodash/divide";
import replace from "lodash/replace";
import groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import multiply from "lodash/multiply";
import parseInt from "lodash/parseInt";
import mapValues from "lodash/mapValues";
import difference from "lodash/difference";
import { google } from "calendar-link";
import formatters from "@/utils/formatters"

import CALENDAR from '@/services/mock/calendaries/2024.json'

export default {
  name: "Calculate",
  data: () => ({
    salary: null,
    year: 2024,
    payday: 10,
    advanceDay: 25,
    data: null,
    modeyDirectiveOptions: {
      prefix: '',
      suffix: '',
      thousands: ' ',
      decimal: '.',
      precision: 0,
      disableNegative: false,
      disabled: false,
      min: null,
      max: null,
      allowBlank: false,
      minimumNumberOfCharacters: 0,
      shouldRound: true,
      focusOnRight: false,
    },
  }),
  computed: {
    calendarData: () => CALENDAR,
    groupedByMonth: (vm) => mapValues(groupBy(vm.data, 'month'), (item) => item?.[0]) ?? {},
    calculatedSalary: (vm) => mapValues(vm.groupedByMonth, (item) => {
      const { firstHalfWorkDays, dayCost: currentMonthDayCost, year, month, paydays } = item;
      const { secondHalfWorkDays = [], dayCost: previousMonthDayCost = 0 } = vm.groupedByMonth?.[month - 1] ?? {};
      const salary = multiply(multiply(previousMonthDayCost, secondHalfWorkDays.length), 0.87);
      const prepaid = multiply(multiply(currentMonthDayCost, firstHalfWorkDays.length), 0.87);
      const paydaysSalary = map([salary, prepaid], (item, idx) => ({ date: vm.formatDate(new Date(year, month - 1, paydays?.[idx])), salary: item }));

      return { ...item, paydays: paydaysSalary };
    }),
    paydays: (vm) => reduce(vm.calculatedSalary, (res, val) => {
      res = concat(res, val.paydays);

      return res;
    }, []),
    sortedData: (vm) => sortBy(vm.paydays, (item) => new Date(item.date)),
    totalSalary: (vm) => reduce(vm.paydays, (sum, { salary = 0 }) => sum + salary, 0),
    routeSalary: {
      get() {
        return this.$route.query?.salary ?? 0;
      },
      set(salary) {
        this.$route.query.salary = salary;
      },
    },
  },
  mounted() {
    console.log('mounted', this.$route.query);
    if (this.routeSalary) {
      this.salary = this.routeSalary;
    }
  },
  methods: {
    calculate() {
      this.data = null;
      this.data = this.calendarData.months?.map((item) => {
        const { days, month } = item;
        const holidays = days
          .split(',')
          .filter((day) => isEmpty(day.match(/\*/))) // Исключаем сокращенные дни
          .map((day) => parseInt(day, 10));
        const holidaysCount = holidays.length;
        const lastDayOfMonth = new Date(this.year, month, 0).getDate();
        const allDaysInMonth = new Array(lastDayOfMonth).fill(0).map((item, idx) => ++idx);
        const workdays = difference(allDaysInMonth, holidays);
        const workdaysCount = workdays.length;
        const paydays = [this.payday, this.advanceDay].map((payday) => this.getPayDay(holidays, payday))
        const dayCost = divide(parseInt(replace(this.salary, ' ', '')), workdaysCount);
        const firstHalfWorkDays = workdays.filter((day) => day <= 15);
        const secondHalfWorkDays = workdays.filter((day) => day > 15);

        item = {
          month,
          year: this.year,
          holidays,
          workdays,
          holidaysCount,
          workdaysCount,
          paydays,
          dayCost,
          firstHalfWorkDays,
          secondHalfWorkDays,
        };

        return item;
      });
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
    formatDate(date) {
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yy = date.getFullYear() % 100;

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      if (yy < 10) yy = '0' + yy;

      return dd + '.' + mm + '.' + yy;
    },
    addToCalendar(date) {
      const event = {
        title: "Зарплата",
        start: date,
        allDay: true,
      };

      google(event);
    },
    getPrice(numeric) {
      return formatters.price(numeric, { currency: true })
    },
  },
}
</script>
