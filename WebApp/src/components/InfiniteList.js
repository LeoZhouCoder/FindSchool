import React from "react";
import InfiniteLoading from "react-simple-infinite-loading";
import PropTypes from "prop-types";

export default class InfiniteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { itemHeight: 10 };
    this.listRef = React.createRef();
    this.itemRef = React.createRef();
  }

  componentDidUpdate() {
    this.updateItemHeight();
  }

  componentDidMount() {
    this.updateItemHeight();
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  backToTop = () => {
    if (this.listRef.current) {
      this.listRef.current.scrollTo(0);
    }
  };

  onResize = () => {
    this.backToTop();
    this.updateItemHeight();
  };

  updateItemHeight = () => {
    if (!this.itemRef.current) return;
    const itemHeight = this.itemRef.current.offsetHeight;
    if (this.state.itemHeight === itemHeight) return;
    this.setState({ itemHeight: itemHeight });
  };

  render() {
    const {
      hasMoreItems,
      loadMoreItems,
      items,
      keyName,
      ItemComponent,
    } = this.props;

    const { itemHeight } = this.state;

    return (
      <InfiniteLoading
        hasMoreItems={hasMoreItems}
        loadMoreItems={loadMoreItems}
        itemHeight={itemHeight}
        ref={this.listRef}
      >
        {items.map((item, index) => (
          <div
            ref={index === 0 ? this.itemRef : null}
            key={item[keyName]}
            className={index % 2 === 0 ? "list-item-second" : ""}
          >
            <ItemComponent data={item} index={index} />
          </div>
        ))}
      </InfiniteLoading>
    );
  }
}

InfiniteList.propTypes = {
  hasMoreItems: PropTypes.bool.isRequired,
  loadMoreItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyName: PropTypes.string.isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
};
