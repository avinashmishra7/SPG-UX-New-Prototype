import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PageHeader from '../../components/utility/pageHeader';
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Input from '../../components/uielements/input';
import IntlMessages from '../../components/utility/intlMessages';
import notification from '../../components/notification';
import YoutubeResult from '../../components/youtubeSearch/result';
import basicStyle from '../../config/basicStyle';
import actions from '../../redux/youtubeSearch/actions';

const Search = Input.Search;
const { youtubeSearch, onPageChange } = actions;

class YoutubeSearch extends Component {
  onSearch = value => {
    if (value && value.length > 0) {
      this.props.youtubeSearch(value);
    } else {
      notification('error', 'Please type something');
    }
  };
  render() {
    const { rowStyle, colStyle, gutter } = basicStyle;
    return (
      <LayoutWrapper>
        <PageHeader>
          <IntlMessages id="sidebar.youtubeSearch" />
        </PageHeader>
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box>
              <Search
                placeholder="Search on Youtube"
                defaultValue={this.props.YoutubeSearch.searcText}
                onSearch={this.onSearch}
              />
              <YoutubeResult
                YoutubeSearch={this.props.YoutubeSearch}
                onPageChange={this.props.onPageChange}
              />
            </Box>
          </Col>
        </Row>
      </LayoutWrapper>
    );
  }
}
function mapStateToProps(state) {
  return { YoutubeSearch: state.YoutubeSearch.toJS() };
}
export default connect(mapStateToProps, { youtubeSearch, onPageChange })(
  YoutubeSearch
);
