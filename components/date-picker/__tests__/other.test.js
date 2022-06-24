import { mount, render } from 'enzyme';
import moment from 'moment';
import React from 'react';
import DatePicker from '..';
import ConfigProvider from '../../config-provider';
import LocaleProvider from '../../locale-provider';
import locale from '../../locale-provider/zh_CN';
import jaJP from '../../locale/ja_JP';
import zhTW from '../locale/zh_TW';

const { MonthPicker, WeekPicker } = DatePicker;

describe('Picker format by locale', () => {
  const myLocale = {
    ...locale,
    DatePicker: {
      ...locale.DatePicker,
      dateFormat: 'YYYY 年 M 月 D 日',
      dateTimeFormat: 'YYYY 年 M 月 D 日 H 时 m 分 s 秒',
      weekFormat: 'YYYY 年 W 周',
      monthFormat: 'YYYY 年 M 月',
    },
  };

  const date = moment('2000-01-01', 'YYYY-MM-DD');
  function matchPicker(name, Picker, props) {
    it(name, () => {
      const wrapper = mount(
        <LocaleProvider locale={myLocale}>
          <Picker value={date} {...props} />
        </LocaleProvider>,
      );

      expect(wrapper.render()).toMatchSnapshot();
    });
  }

  matchPicker('date', DatePicker);
  matchPicker('dateTime', DatePicker, { showTime: true });
  matchPicker('week', WeekPicker);
  matchPicker('month', MonthPicker);
});

describe('MonthPicker and WeekPicker', () => {
  it('render MonthPicker', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const wrapper = mount(<MonthPicker open />);
    wrapper.setProps({ value: birthday });
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });

  it('render WeekPicker', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const wrapper = mount(<WeekPicker open />);
    wrapper.setProps({ value: birthday });
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });
});

describe('Override locale setting of the ConfigProvider', () => {
  it('DatePicker', () => {
    const wrapper = mount(
      <ConfigProvider locale={jaJP}>
        <DatePicker locale={zhTW} />
      </ConfigProvider>,
    );
    expect(wrapper.find('input').props().placeholder).toEqual('請選擇日期');
  });
  it('RangePicker', () => {
    const wrapper = mount(
      <ConfigProvider locale={jaJP}>
        <DatePicker.RangePicker locale={zhTW} />
      </ConfigProvider>,
    );
    expect(wrapper.find('input').at(0).props().placeholder).toEqual('開始日期');
    expect(wrapper.find('input').at(1).props().placeholder).toEqual('結束日期');
  });
});
