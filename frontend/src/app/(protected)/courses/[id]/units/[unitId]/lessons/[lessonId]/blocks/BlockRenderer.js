'use client';

import ObjectivesBlock from './ObjectivesBlock';
import ContextBlock    from './ContextBlock';
import RuleBlock       from './RuleBlock';
import PatternsBlock   from './PatternsBlock';
import PracticeBlock   from './PracticeBlock';
import SummaryBlock    from './SummaryBlock';
import styles from '../Lesson.module.css';

// Registro tipo → componente. Añadir un tipo de bloque nuevo implica
// definir su forma en backend/src/models/lesson.model.js y registrar aquí
// el componente que lo renderiza — el resto del sistema (modelo, page.js,
// fallback a RichLessonText) no necesita cambios.
const BLOCK_COMPONENTS = {
  objectives: ObjectivesBlock,
  context:    ContextBlock,
  rule:       RuleBlock,
  patterns:   PatternsBlock,
  practice:   PracticeBlock,
  summary:    SummaryBlock,
};

export default function BlockRenderer({ blocks }) {
  return (
    <div className={styles.blocksStack}>
      {blocks.map((block, i) => {
        const Component = BLOCK_COMPONENTS[block.type];
        if (!Component) return null;
        return <Component key={i} block={block} index={i} />;
      })}
    </div>
  );
}
