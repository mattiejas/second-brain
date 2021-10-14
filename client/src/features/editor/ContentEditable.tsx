import React, { DetailedHTMLProps, RefObject } from "react";
import cn from "classnames";

interface Props {
  initialValue: string;
  onEdit: (html: string) => void;
  disabled?: boolean;
}

export type ContentEditableProps = DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props;

export default class ContentEditable extends React.Component<ContentEditableProps> {
  private target: RefObject<HTMLDivElement>;

  constructor(props: ContentEditableProps) {
    super(props);
    this.target = React.createRef<HTMLDivElement>();
  }

  shouldComponentUpdate(nextProps: ContentEditableProps) {
    return nextProps.initialValue !== this.target.current?.innerHTML;
  }

  emitChange() {
    var text = this.target?.current?.innerHTML || "";

    if (this.props.onEdit) {
      this.props.onEdit(text);
    }
  }

  render() {
    const { className, initialValue, disabled, onEdit, ...props } = this.props;
    return (
      <div
        {...props}
        className={cn("outline-none cursor-text", className)}
        ref={this.target}
        onInput={() => this.emitChange()}
        onBlur={() => this.emitChange()}
        contentEditable={!disabled}
        dangerouslySetInnerHTML={{ __html: initialValue }}
      ></div>
    );
  }
}
