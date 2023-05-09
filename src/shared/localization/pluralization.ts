import getTextTemplate from "./textTemplate";

function pluralDefaultRule(choice?: number, choicesLength?: number): number {
  choice = Math.abs(choice || 0);
  if (choicesLength === 2) {
    if (choice) {
      if (choice > 1) return 1;
      return 0;
    }
    return 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}

function pluralParse(
  text: string,
  pluralIndex?: number,
  params?: { [key: string]: any },
): any {
  if (!text) return "";
  const messages = text.split(/(?!{'|{"})(?:\s\|\s)(?!'}|"})/);
  const defaultIndex = params?.n || params?.count || pluralIndex;
  const paramsData = { count: defaultIndex, n: defaultIndex, ...params };
  return getTextTemplate(
    (messages[pluralDefaultRule(pluralIndex, messages.length)] || text).replace(
      /({'|{")\|('}|"})/g,
      "|",
    ),
    paramsData,
  );
}

export default pluralParse;
