// This is a counter widget with buttons to increment and decrement the number.


const { widget } = figma
const { useSyncedState, AutoLayout, Text, SVG } = widget

const ColorSelecterWidget = () => {
  const colorList = [
    'primary',
    'primary-hover',
    'secondary',
    'secondary-hover',
    'contrast',
    'contrast-hover',
    'contrast-inverse',
    'bg',
    'bg-1',
    'cancel',
    'card',
    'inverse',
    'disabled',
    'disabled-border',
    'info',
    'info-hover',
    'info-light',
    'link',
    'link-hover',
    'link-light',
    'success',
    'success-hover',
    'success-light',
    'warning',
    'warning-hover',
    'warning-light',
    'danger',
    'danger-hover',
    'danger-light',
    'muted',
    'text-h1',
    'text-h2',
    'text-h3',
    'text-body',
    'text-sub',
    'text-caption',
    'text-disabled'
  ];

  const [count, setCount] = useSyncedState('count', 0);

  const replaceColor = (flag:string, name:string) => {
    const colorPage = figma.root.children.find(el => el.name === 'color');
    const pageFrame = colorPage?.children.find(el => el.name === 'Color name') as FrameNode;
    
    const objectName = name === 'inverse' ? `color-org-${name}` : `color-org-${flag}-${name}`;
    const depth1 = pageFrame.findAll(el => el.name === objectName)[0] as FrameNode;
    const depth2 = depth1.findAll(el => el.name === 'color')[0]  as FrameNode;
    const color = (depth2.fills as SolidPaint[])[0].color;
    
    const target = figma.getLocalPaintStyles().filter(el => el.name === `color-${name}`)[0];
    console.log(objectName, target, color);

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
    for (let i = 0; i < colorList.length; i++) {
      const name = colorList[i];
      replaceColor(flag, name);
    }
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
