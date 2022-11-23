<template>
  <div class="select-period">
    <div class="label">기간 선택</div>
    <div class="select">
      <div class="main-container">
        <select v-model="selected" class="main-select">
          <option
            v-for="period in periods"
            :value="period.value"
            :key="period.value"
          >
            {{ period.text }}
          </option>
        </select>
      </div>
      <div class="sub-container">
        <input
          v-if="this.selected == 0"
          type="date"
          v-model="date"
        />
        <input
          v-if="this.selected == 1"
          type="week"
          v-model="week"
        />

        <input
          v-if="this.selected == 2"
          type="month"
          v-model="month"
        />
        <div
          v-if="this.selected == 3"
          class="season-container"
        >
          <input
            type="month"
            v-model="startMonth"
            min="2010-12"
            step="3"
          />
          ~
          <input type="month" v-model="endMonth" disabled />
        </div>
      </div>
      <div class="button-container">
        <button class="select-btn">선택</button>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      selected: "0",
      date: "",
      week: "",
      month: "",
      startMonth: "",
      periods: [
        {
          text: "일별",
          value: "0",
          subLabel: "날짜 선택",
        },
        {
          text: "주별",
          value: "1",
          subLabel: "주차 선택",
        },
        {
          text: "월별",
          value: "2",
          subLabel: "월을 선택",
        },
        {
          text: "계절별",
          value: "3",
          subLabel: "계절 선택",
        },
      ],
      seasons: [
        {
          text: "겨울 12~2월",
          value: "4",
        },
        {
          text: "봄 3~5월",
          value: "1",
        },
        {
          text: "여름 6~8월",
          value: "2",
        },
        {
          text: "가을 9~11월",
          value: "3",
        },
      ],
    };
  },
  methods: {
    getWeekFromISODate(dt) {
      dt.setHours(0, 0, 0, 0);
      dt.setDate(
        dt.getDate() + 3 - ((dt.getDay() + 6) % 7)
      );
      const week1 = new Date(dt.getFullYear(), 0, 4);

      const weekNumber =
        1 +
        Math.round(
          ((dt.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7
        );

      return `${dt.getFullYear()}-W${weekNumber}`;
    },
    getStartDateFromISOWeek(iSOweek) {
      const y = parseInt(iSOweek.substring(0, 4));
      const w = parseInt(iSOweek.substring(6, 8));

      const simpleDate = new Date(y, 0, 1 + (w - 1) * 7);
      const dayOfWeek = simpleDate.getDay();
      const iSOweekStart = simpleDate;
      if (dayOfWeek <= 4) {
        iSOweekStart.setDate(
          simpleDate.getDate() - simpleDate.getDay() + 1
        );
      } else {
        iSOweekStart.setDate(
          simpleDate.getDate() + 8 - simpleDate.getDay()
        );
      }

      return iSOweekStart;
    },
    getStartMonth() {
      var currYear = Number(
        new Date().toISOString().slice(0, 4)
      );
      var currMonth = new Date().toISOString().slice(5, 7);
      if (currMonth === "04" || currMonth === "05") {
        currMonth = "03";
      } else if (currMonth === "07" || currMonth === "08") {
        currMonth = "06";
      } else if (currMonth === "10" || currMonth === "11") {
        currMonth = "09";
      } else if (currMonth === "01" || currMonth === "02") {
        currYear = currYear - 1;
        currMonth = "12";
      }

      return `${currYear}-${currMonth}`;
    },
  },
  created() {
    this.date = new Date().toISOString().substring(0, 10);
    this.week = this.getWeekFromISODate(new Date());
    this.month = new Date().toISOString().slice(0, 7);
    this.startMonth = this.getStartMonth();
  },
  computed: {
    endMonth() {
      var currYear = Number(
        new Date().toISOString().slice(0, 4)
      );
      var currMonth = this.startMonth.slice(5, 7);
      if (currMonth === "12") {
        currYear = currYear + 1;
        currMonth = "02";
      } else if (currMonth === "03") {
        currMonth = "05";
      } else if (currMonth === "06") {
        currMonth = "08";
      } else if (currMonth === "09") {
        currMonth = "11";
      }
      return `${currYear}-${currMonth}`;
    },
  },
};
</script>

<style>
.select {
  display: flex;
}
.sub-container {
  margin-left: 10px;
  color: #e8e8e8;
}
.label {
  color: #e8e8e8;
  margin-bottom: 4px;
  font-size: 14px;
}

.main-select {
  background-color: rgb(39, 39, 39);
  color: #e8e8e8;
  font-size: 18px;
  padding: 5px;
  font-size: 15px;
  width: 100px;
  border: none;
  outline: 1px #676767a6 solid;
  height: 30px;
}
input {
  color: #e8e8e8;
  font-family: "Noto Sans KR", sans-serif;
  background-color: rgb(39, 39, 39);
  outline: 1px #676767a6 solid;
  border: none;
  height: 30px;
  width: 160px;
  color-scheme: dark;
}
.season-container input {
  width: 100px;
}
.button-container {
  margin-left: 2px;
}
.button-container button {
  width: 80px;
  height: 30px;
  font-size: 17px;
  margin: 0 5px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
}

.select-btn {
  background-color: #3f8ae2;
}
.select-btn:hover {
  background-color: #2f6cb1;
}
</style>
