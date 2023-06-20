// This is a counter widget with buttons to increment and decrement the number.

const { widget } = figma
const { useSyncedState, AutoLayout, Text, SVG } = widget

const ColorSelecterWidget = () => {
  const [count, setCount] = useSyncedState('count', 0);

  const replaceColor = (flag:string, name:string) => {
    const colorPage = figma.root.children.find(el => el.name === 'color');
    const pageFrame = colorPage?.children.find(el => el.name === 'Color name') as FrameNode;
    
    const objectName = name === 'inverse' ? `color-org-${name}` : `color-org-${flag}-${name}`;
    const depth1 = pageFrame.findAll(el => el.name === objectName)[0] as FrameNode;
    const depth2 = depth1.findAll(el => el.name === 'color')[0]  as FrameNode;
    const color = (depth2.fills as SolidPaint[])[0].color;
    
    const target = figma.getLocalPaintStyles().filter(el => el.name === `color-${name}`)[0];


    if(target) {
      target.paints = [
        {
          type: "SOLID",
          visible: true,
          opacity: 1,
          blendMode: "NORMAL",
          color: color
        }
      ]
    }
      
  }

  const replaceColorList = (flag: string) => {
    replaceColor(flag, 'primary');
    replaceColor(flag, 'primary-hover');
    replaceColor(flag, 'secondary');
    replaceColor(flag, 'secondary-hover');
    replaceColor(flag, 'contrast');
    replaceColor(flag, 'contrast-hover');
    replaceColor(flag, 'contrast-inverse');
    replaceColor(flag, 'bg');
    replaceColor(flag, 'bg-1');
    replaceColor(flag, 'cancel');
    replaceColor(flag, 'card');
    replaceColor(flag, 'inverse');
    replaceColor(flag, 'disabled');
    replaceColor(flag, 'disabled-border');
    replaceColor(flag, 'info');
    replaceColor(flag, 'info-hover');
    replaceColor(flag, 'info-light');
    replaceColor(flag, 'link');
    replaceColor(flag, 'link-hover');
    replaceColor(flag, 'link-light');
    replaceColor(flag, 'success');
    replaceColor(flag, 'success-hover');
    replaceColor(flag, 'success-light');
    replaceColor(flag, 'warning');
    replaceColor(flag, 'warning-hover');
    replaceColor(flag, 'warning-light');
    replaceColor(flag, 'danger');
    replaceColor(flag, 'danger-hover');
    replaceColor(flag, 'danger-light');
    replaceColor(flag, 'muted');
    replaceColor(flag, 'text-h1');
    replaceColor(flag, 'text-h2');
    replaceColor(flag, 'text-h3');
    replaceColor(flag, 'text-body');
    replaceColor(flag, 'text-sub');
    replaceColor(flag, 'text-caption');
    replaceColor(flag, 'text-disabled');
  }
  return (
    <AutoLayout
      verticalAlignItems={'center'}
      spacing={8}
      padding={16}
      cornerRadius={8}
    >
      <SVG
        src={`<svg width="440" height="60" viewBox="0 0 440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" rx="30" fill="white" stroke="black" stroke-opacity="0.1"/>
        <text x="100" y="50" text-anchor="left" font-size="56" fill="black">Light Mode</text>
        <rect x="10" y="10" width="40" height="40" rx="20" fill="black" style="display:${count === 0 ? 'block':'none'}" />
        </svg>`}
        onClick={() => {
          setCount(0);
          replaceColorList('light');
        }}
      ></SVG>
      <SVG
        src={`<svg width="440" height="60" viewBox="0 0 440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" rx="30" fill="white" stroke="black" stroke-opacity="0.1"/>
        <text x="100" y="50" text-anchor="left" font-size="56" fill="black">Dark Mode</text>
        <rect x="10" y="10" width="40" height="40" rx="20" fill="black" style="display:${count === 1 ? 'block':'none'}" />
        </svg>`}
        onClick={() => {
          setCount(1);
          replaceColorList('dark');
        }}
      ></SVG>
    </AutoLayout>
  )
}

widget.register(ColorSelecterWidget)
