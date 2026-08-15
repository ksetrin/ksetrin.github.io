/**
 * Банк интервью-вопросов (ТЗ ч.2, §29–30, §40).
 * Цель кампании — 60+ вопросов, распределение по доменам согласно §40.
 *
 * kind: definition | mechanism | tradeoff | failure | architecture | production | interview
 */

const q = (id, topic, kind, ru, en) => ({ id, topic, kind, text: { ru, en } });

export const QUESTIONS = [
  // Python — 15
  q('py-1', 'py-basics', 'definition', 'Чем список отличается от кортежа и когда это важно?', 'How does a list differ from a tuple, and when does it matter?'),
  q('py-2', 'py-basics', 'mechanism', 'Что произойдёт, если использовать изменяемый объект как значение аргумента по умолчанию?', 'What happens if you use a mutable object as a default argument value?'),
  q('py-3', 'py-collections', 'tradeoff', 'Когда comprehension делает код хуже, а не лучше?', 'When does a comprehension make code worse rather than better?'),
  q('py-4', 'py-collections', 'mechanism', 'Почему dict и set дают доступ за O(1) и когда это ломается?', 'Why do dict and set give O(1) access, and when does that break?'),
  q('py-5', 'py-functions', 'mechanism', 'Как работает разрешение имён: LEGB?', 'How does name resolution work: LEGB?'),
  q('py-6', 'py-functions', 'failure', 'Чем плох except без указания типа исключения?', 'What is wrong with a bare except?'),
  q('py-7', 'py-classes', 'tradeoff', 'Класс, dataclass или NamedTuple — как выбрать?', 'Class, dataclass or NamedTuple — how do you choose?'),
  q('py-8', 'py-classes', 'production', 'Что даёт typing в рантайме, а что — нет?', 'What does typing give you at runtime, and what does it not?'),
  q('py-9', 'py-modules', 'failure', 'Как возникает circular import и как его убрать?', 'How does a circular import arise and how do you remove it?'),
  q('py-10', 'py-async', 'mechanism', 'Что делает event loop, когда корутина ждёт I/O?', 'What does the event loop do while a coroutine awaits I/O?'),
  q('py-11', 'py-async', 'failure', 'Что случится, если внутри async-функции вызвать блокирующий код?', 'What happens if you call blocking code inside an async function?'),
  q('py-12', 'py-async', 'tradeoff', 'Когда нужны потоки, а когда asyncio?', 'When do you need threads and when asyncio?'),
  q('py-13', 'py-pydantic', 'mechanism', 'Что именно валидирует Pydantic и в какой момент?', 'What exactly does Pydantic validate, and when?'),
  q('py-14', 'py-fastapi', 'architecture', 'Как устроен dependency injection в FastAPI и зачем он нужен?', 'How does dependency injection work in FastAPI, and why is it needed?'),
  q('py-15', 'py-testing', 'production', 'Что вы будете мокать в тестах LLM-сервиса, а что — нет?', 'What would you mock in tests of an LLM service, and what not?'),

  // LLM — 8
  q('llm-1', 'llm-basics', 'definition', 'Что такое токен и почему длина в токенах не равна длине в символах?', 'What is a token, and why does token length differ from character length?'),
  q('llm-2', 'llm-basics', 'mechanism', 'Что происходит с контекстом при превышении context window?', 'What happens to the context when the context window overflows?'),
  q('llm-3', 'llm-basics', 'architecture', 'Зачем разделять system, user и tool сообщения?', 'Why separate system, user and tool messages?'),
  q('llm-4', 'llm-structured', 'mechanism', 'Как гарантировать валидный JSON на выходе модели?', 'How do you guarantee valid JSON in the model output?'),
  q('llm-5', 'llm-structured', 'failure', 'Что делать, если модель вернула схему, но с бессмысленными значениями?', 'What do you do if the model returns a valid schema with meaningless values?'),
  q('llm-6', 'llm-streaming', 'production', 'Как streaming влияет на воспринимаемую и реальную латентность?', 'How does streaming affect perceived and actual latency?'),
  q('llm-7', 'llm-model-selection', 'tradeoff', 'По каким критериям вы выберете модель для конкретной задачи?', 'By what criteria do you pick a model for a given task?'),
  q('llm-8', 'llm-model-selection', 'production', 'Как посчитать стоимость одного запроса в продакшене?', 'How do you compute the cost of one request in production?'),

  // Prompting
  q('prompt-1', 'prompt-structure', 'mechanism', 'Из каких частей состоит хорошо структурированный промпт?', 'What parts make up a well-structured prompt?'),
  q('prompt-2', 'prompt-versioning', 'production', 'Как вы будете версионировать промпты и откатывать изменения?', 'How would you version prompts and roll back changes?'),

  // Agents — 10
  q('agent-1', 'agent-loop', 'definition', 'Что такое agent loop и чем агент отличается от цепочки вызовов?', 'What is an agent loop, and how does an agent differ from a chain of calls?'),
  q('agent-2', 'agent-loop', 'architecture', 'Где в системе должен быть детерминированный код, а где LLM?', 'Where should deterministic code live in the system, and where the LLM?'),
  q('agent-3', 'agent-state', 'mechanism', 'Как вы храните состояние агента между шагами?', 'How do you store agent state between steps?'),
  q('agent-4', 'agent-state', 'failure', 'Что произойдёт, если агент потеряет состояние на середине задачи?', 'What happens if the agent loses state halfway through a task?'),
  q('agent-5', 'agent-routing', 'tradeoff', 'Роутинг моделью или роутинг кодом — что выбрать и почему?', 'Model-driven routing or code-driven routing — which and why?'),
  q('agent-6', 'agent-reliability', 'production', 'Как построить retry так, чтобы не удвоить побочные эффекты?', 'How do you build retries without duplicating side effects?'),
  q('agent-7', 'agent-reliability', 'failure', 'Что делать, если агент зациклился на одном инструменте?', 'What do you do if the agent loops on a single tool?'),
  q('agent-8', 'agent-hitl', 'architecture', 'В какой момент нужно человеческое подтверждение?', 'At what point is human approval required?'),
  q('agent-9', 'agent-hitl', 'production', 'Как сделать идемпотентный вызов инструмента?', 'How do you make a tool call idempotent?'),
  q('agent-10', 'agent-loop', 'interview', 'Объясните архитектуру вашего агента за две минуты.', 'Explain your agent architecture in two minutes.'),

  // RAG — 10
  q('rag-1', 'rag-ingestion', 'mechanism', 'Что происходит между загрузкой документа и ответом модели?', 'What happens between loading a document and the model answering?'),
  q('rag-2', 'rag-chunking', 'tradeoff', 'Почему chunking влияет на качество ответа?', 'Why does chunking affect answer quality?'),
  q('rag-3', 'rag-chunking', 'failure', 'Что ломается при слишком мелких и слишком крупных чанках?', 'What breaks with chunks that are too small and too large?'),
  q('rag-4', 'rag-embeddings', 'mechanism', 'Что именно измеряет косинусная близость эмбеддингов?', 'What exactly does cosine similarity of embeddings measure?'),
  q('rag-5', 'rag-retrieval', 'tradeoff', 'Чем отличается векторный поиск от keyword и когда нужен гибрид?', 'How does vector search differ from keyword search, and when is hybrid needed?'),
  q('rag-6', 'rag-reranking', 'definition', 'Чем retrieval отличается от reranking?', 'How does retrieval differ from reranking?'),
  q('rag-7', 'rag-retrieval', 'failure', 'Нужный документ есть в базе, но retrieval его не возвращает. Ваши действия?', 'The right document is in the store but retrieval does not return it. What do you do?'),
  q('rag-8', 'rag-citations', 'production', 'Как обеспечить проверяемые цитаты в ответе?', 'How do you ensure verifiable citations in an answer?'),
  q('rag-9', 'rag-chunking', 'interview', 'Как вы докажете, что новая стратегия chunking стала лучше?', 'How will you prove a new chunking strategy is better?'),
  q('rag-10', 'rag-retrieval', 'architecture', 'Как обеспечить свежесть данных в RAG-системе?', 'How do you keep data fresh in a RAG system?'),

  // Evaluation — 5
  q('eval-1', 'eval-dataset', 'definition', 'Что такое golden dataset и как его собрать честно?', 'What is a golden dataset and how do you build one honestly?'),
  q('eval-2', 'eval-metrics', 'mechanism', 'Как измерить groundedness ответа?', 'How do you measure the groundedness of an answer?'),
  q('eval-3', 'eval-metrics', 'tradeoff', 'Когда автоматическая оценка вводит в заблуждение?', 'When does automated evaluation mislead you?'),
  q('eval-4', 'eval-regression', 'production', 'Как встроить регрессионные прогоны в CI?', 'How do you wire regression runs into CI?'),
  q('eval-5', 'eval-metrics', 'interview', 'Какие метрики вы покажете продакт-менеджеру, а какие — инженеру?', 'Which metrics do you show a product manager, and which an engineer?'),

  // Production — 5
  q('prod-1', 'prod-docker', 'production', 'Что должен проверять healthcheck LLM-сервиса?', 'What should the healthcheck of an LLM service verify?'),
  q('prod-2', 'prod-observability', 'mechanism', 'Зачем нужен trace ID и что он должен связывать?', 'Why do you need a trace ID and what should it link?'),
  q('prod-3', 'prod-observability', 'production', 'Что нельзя писать в логи LLM-приложения?', 'What must never go into the logs of an LLM application?'),
  q('prod-4', 'prod-resilience', 'failure', 'Провайдер модели отвечает 30 секунд. Что происходит с вашей системой?', 'The model provider takes 30 seconds to respond. What happens to your system?'),
  q('prod-5', 'prod-resilience', 'architecture', 'Как устроен fallback между провайдерами моделей?', 'How do you design fallback between model providers?'),

  // Architecture — 5
  q('arch-1', 'arch-boundaries', 'architecture', 'Когда LLM-вызов должен быть синхронным, а когда через очередь?', 'When should an LLM call be synchronous, and when queued?'),
  q('arch-2', 'arch-storage', 'tradeoff', 'Что кэшировать в LLM-приложении и что при этом ломается?', 'What do you cache in an LLM application, and what breaks when you do?'),
  q('arch-3', 'arch-storage', 'architecture', 'Где хранить векторы: отдельная БД или расширение существующей?', 'Where do you store vectors: a dedicated DB or an extension of the existing one?'),
  q('arch-4', 'arch-system-design', 'interview', 'Спроектируйте вслух AI-ассистента поддержки на 10k запросов в день.', 'Design out loud a support AI assistant handling 10k requests per day.'),
  q('arch-5', 'arch-system-design', 'tradeoff', 'Где в вашей архитектуре главное узкое место по стоимости?', 'Where is the main cost bottleneck in your architecture?'),

  // Security — 2 (+MCP)
  q('sec-1', 'sec-injection', 'failure', 'Как выглядит косвенная prompt injection через документ в RAG?', 'What does indirect prompt injection through a RAG document look like?'),
  q('sec-2', 'sec-agency', 'architecture', 'Что ваша AI-система НЕ имеет права делать и как это гарантировано?', 'What is your AI system not allowed to do, and how is that enforced?'),
  q('mcp-1', 'mcp-basics', 'definition', 'Что MCP стандартизирует и какую проблему это решает?', 'What does MCP standardise, and which problem does that solve?'),
  q('mcp-2', 'mcp-permissions', 'production', 'Как ограничить права инструмента, который умеет писать в БД?', 'How do you limit the permissions of a tool that can write to a database?')
];

export const QUESTIONS_TARGET = 60;

export const getQuestion = (id) => QUESTIONS.find((item) => item.id === id);

export const questionsForTopic = (topicId) => QUESTIONS.filter((item) => item.topic === topicId);
