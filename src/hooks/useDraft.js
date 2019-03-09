import React, { useState } from "react";
import produce from "immer";

const useDraft = initialState => {
  const [state, setState] = useState(initialState);

  return [state, setDraftCb => setState(produce(state, setDraftCb))];
};

export default useDraft;
