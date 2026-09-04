drop table if exists experiment cascade;
create table IF NOT EXISTS experiment(
  experiment_name text primary key,
  sources text
);
insert into experiment values('Test', 'some code');

drop table if exists requested_execution_id cascade;
create table IF NOT EXISTS requested_execution_id(
  experiment_name text references experiment,
  execution_id text,
  requested_at timestamp,
  constraint pk primary key (experiment_name, execution_id)
);

ALTER DATABASE experimentation OWNER TO softwarescience;
ALTER TABLE experiment OWNER TO softwarescience;
ALTER TABLE requested_execution_id OWNER TO softwarescience;


drop function if exists request_experiment_execution_key;
CREATE OR REPLACE FUNCTION request_experiment_execution_key(experiment text) returns text as $$
  DECLARE
    var text;
	is_contained boolean;
	done boolean;
  BEGIN
    done := false;
	while NOT done loop
	    begin
		  insert into requested_execution_id (experiment_name, execution_id, requested_at)
						SELECT
								experiment,
								(SELECT md5(random()::text)) || (SELECT md5(random()::text)) ||  (SELECT md5(random()::text)) as random_number,
								NOW() returning requested_execution_id.execution_id into var;
		  return var;
		  exception when unique_violation then
  			done :=false;
		  end;
    end loop;
END;
$$ language plpgsql;

drop function if exists register_experiment;
CREATE OR REPLACE FUNCTION register_experiment(n text, s text) returns text as $$
  DECLARE
    var text;
	is_contained boolean;
	done boolean;
  BEGIN
    select * from experiment where experiment_name = n into var;
	if var='' then
		  insert into experiment values(n, s);
	else
		  update experiment set sources = s where experiment_name = n;
    end if;
	return s;
END;
$$ language plpgsql;

select register_experiment('Dummy', 'ABC');
select request_experiment_execution_key('Test');
select * from requested_execution_id;