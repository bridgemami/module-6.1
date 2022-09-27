import { getCharactersIds, getCharactersData } from '../../lib/resources';

//every next.js app that use dynamic urls must include a getStaticPaths()
export async function getStaticPaths() {
    const paths= await getCharactersIds();
    console.log('paths from [id].js: ' + paths);
    return {
        paths,
        fallback: false
    };
}

//every next.js app that use dynamic urls must include a getStaticProps()

export async function getStaticProps({params}) {
    const itemData = await getCharactersData(params.id);
    return {
        props: {
            itemData
        }
    }

}

export default function Entry({itemData}) {
    console.log(itemData);
  return (
    <article className="card col-6">
      <div className="card-body">
        <h5 className="card-title">{itemData.data.name}</h5>
        <p className="card-text">{itemData.data.quote}</p>
        {/* using a teneray(?) to ask if database has spices in its dtabase */}
        {itemData.data.species ?
          <a className="btn btn-primary" href={itemData.data.species}>Link out</a>
          : null
        }
      </div>
    </article>
  );
}
