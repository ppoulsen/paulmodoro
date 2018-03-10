import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import History from '../components/History';
import { loadSessions } from '../actions/history';

function mapStateToProps(state) {
  return {
    sessions: state.history.sessions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadSessions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
