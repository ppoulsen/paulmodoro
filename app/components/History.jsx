import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { Tabs, Tab } from 'material-ui/Tabs';
import ListIcon from 'material-ui/svg-icons/action/list';
import ChartIcon from 'material-ui/svg-icons/editor/show-chart';
import styles from './History.css';

function getTimeDiff(startTimeIso, endTimeIso) {
  const startMoment = moment(startTimeIso);
  const endMoment = moment(endTimeIso);
  const diff = startMoment.diff(endMoment);
  const duration = moment.duration(diff);
  return duration.humanize();
}

/* eslint-disable react/prefer-stateless-function */
class History extends React.Component {
  static propTypes = {
    loadSessions: PropTypes.func.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape({
      canceledSessionTimeIso: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number.isRequired,
      endTimeIso: PropTypes.string,
      finishedSession: PropTypes.bool,
      startTimeIso: PropTypes.string.isRequired,
    })).isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      tab: 'table',
    };
  }

  componentDidMount() {
    this.props.loadSessions();
  }

  renderTableTab() {
    return (
      <Table fixedHeader selectable={false} height="70vh">
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Start Date/Time</TableHeaderColumn>
            <TableHeaderColumn>Duration</TableHeaderColumn>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn>Completed Pomodoro</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover
          stripedRows
          displayRowCheckbox={false}
        >
          {this.props.sessions.map(s => (
            <TableRow key={s.id}>
              <TableRowColumn>{moment(s.startTimeIso).format('lll')}</TableRowColumn>
              <TableRowColumn>
                {getTimeDiff(s.startTimeIso, s.endTimeIso || s.canceledSessionTimeIso)}
              </TableRowColumn>
              <TableRowColumn>{s.description || ''}</TableRowColumn>
              <TableRowColumn>{s.finishedSession ? 'Yes' : 'No'}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>History</h1>
        <Divider />
        <Tabs value={this.state.tab} onChange={tab => this.setState({ tab })}>
          <Tab icon={<ListIcon />} value="table">
            {this.renderTableTab()}
          </Tab>
          <Tab icon={<ChartIcon />} value="chart" />
        </Tabs>
      </div>
    );
  }
}

export default History;
