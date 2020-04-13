import React from "react";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Slide } from "@material-ui/core";

export default React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});