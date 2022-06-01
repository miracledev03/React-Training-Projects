import { useParams } from "react-router-dom";
import { Fragment } from "react";
import { Route } from "react-router-dom";
import HighlightedQuote from '../components/quotes/HighlightedQuote';

import Comments from '../components/comments/Comments';
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

  console.log(loadedQuote);

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />

      <Route path={`${match.path}`} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
}

export default QuoteDetail;
